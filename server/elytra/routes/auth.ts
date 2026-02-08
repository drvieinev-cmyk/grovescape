import { Router } from "express";
import { pool } from "../services/db";
import { requireFirebaseAuth, AuthedRequest } from "../middleware/auth";
import { admin } from "../services/firebase";

export const authRouter = Router();

function normalizeEmail(email?: string | null) {
    if (!email) return null;
    return email.trim().toLowerCase();
}

/**
 * POST /v1/auth/firebase/session
 * Verifies Firebase token and syncs the user profile with Postgres.
 */
authRouter.post("/v1/auth/firebase/session", requireFirebaseAuth, async (req: AuthedRequest, res) => {
    const fb = req.firebase!;
    const uid = fb.uid;

    const client = await pool.connect();
    try {
        // 1. Fetch latest state from Firebase (canonical profile)
        const user = await admin.auth().getUser(uid);

        const email = user.email ?? null;
        const emailNorm = normalizeEmail(email);
        const providers = user.providerData.map(p => p.providerId);
        const displayName = user.displayName ?? fb.name ?? null;
        const avatarUrl = user.photoURL ?? fb.picture ?? null;
        const locale = (fb as any).locale ?? "en-US";
        const emailVerified = !!user.emailVerified;

        await client.query("BEGIN");

        // 2. Upsert app_user
        const upsertQuery = `
      INSERT INTO app_user (
        firebase_uid, email, email_normalized, email_verified, 
        display_name, avatar_url, locale, providers, last_login_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8::text[], NOW())
      ON CONFLICT (firebase_uid)
      DO UPDATE SET
        email = EXCLUDED.email,
        email_normalized = EXCLUDED.email_normalized,
        email_verified = EXCLUDED.email_verified,
        display_name = EXCLUDED.display_name,
        avatar_url = EXCLUDED.avatar_url,
        locale = EXCLUDED.locale,
        providers = EXCLUDED.providers,
        last_login_at = NOW()
    `;

        await client.query(upsertQuery, [
            uid, email, emailNorm, emailVerified,
            displayName, avatarUrl, locale, providers
        ]);

        // 3. Sync identities
        for (const p of user.providerData) {
            await client.query(
                `INSERT INTO auth_identity (firebase_uid, provider, provider_user_id, email, email_normalized, last_used_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         ON CONFLICT (provider, provider_user_id) DO UPDATE SET last_used_at = NOW()`,
                [uid, p.providerId, p.uid, p.email, normalizeEmail(p.email)]
            );
        }

        // 4. Record Audit
        await client.query(
            `INSERT INTO auth_audit_log (firebase_uid, event_type, provider, success, message)
       VALUES ($1, 'LOGIN_SYNC', $2, true, 'Profile and session synchronized')`,
            [uid, providers[0] || 'unknown']
        );

        await client.query("COMMIT");

        const { rows } = await client.query("SELECT * FROM app_user WHERE firebase_uid = $1", [uid]);
        res.json({ success: true, user: rows[0] });

    } catch (error: any) {
        await client.query("ROLLBACK");
        console.error("Session Sync Error:", error);
        res.status(500).json({ code: "SYNC_FAILED", message: "Failed to synchronize user session" });
    } finally {
        client.release();
    }
});

/**
 * GET /v1/me
 * Retrieves the current ELYTRA user profile.
 */
authRouter.get("/v1/me", requireFirebaseAuth, async (req: AuthedRequest, res) => {
    const uid = req.firebase!.uid;
    try {
        const { rows } = await pool.query("SELECT * FROM app_user WHERE firebase_uid = $1", [uid]);
        if (!rows[0]) {
            return res.status(404).json({ code: "NOT_FOUND", message: "User profile not found" });
        }
        res.json({ success: true, user: rows[0] });
    } catch (error) {
        res.status(500).json({ code: "QUERY_FAILED", message: "Error fetching profile" });
    }
});

/**
 * POST /v1/auth/logout
 * Revokes refresh tokens on the Firebase side.
 */
authRouter.post("/v1/auth/logout", requireFirebaseAuth, async (req: AuthedRequest, res) => {
    const uid = req.firebase!.uid;
    try {
        await admin.auth().revokeRefreshTokens(uid);
        await pool.query(
            "INSERT INTO auth_audit_log (firebase_uid, event_type, success, message) VALUES ($1, 'LOGOUT', true, 'Refresh tokens revoked')",
            [uid]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ code: "LOGOUT_FAILED", message: "Failed to revoke session" });
    }
});
