import { Request, Response, NextFunction } from "express";
import { admin } from "../services/firebase";
import { pool } from "../services/db";
import crypto from "crypto";

export type AuthedRequest = Request & {
    firebase?: admin.auth.DecodedIdToken;
    user?: { id: string; data_key_salt: string };
};

export async function requireFirebaseAuth(req: AuthedRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.header("authorization") || "";
        const match = authHeader.match(/^Bearer (.+)$/i);

        if (!match) {
            return res.status(401).json({
                code: "UNAUTHORIZED",
                message: "Bearer token required"
            });
        }

        const idToken = match[1];
        const decoded = await admin.auth().verifyIdToken(idToken, true);
        req.firebase = decoded;

        // Auto-sync user to Postgres for Tesla data persistence
        const { rows } = await pool.query(
            `INSERT INTO app_user (firebase_uid, email, data_key_salt) 
             VALUES ($1, $2, $3)
             ON CONFLICT (firebase_uid) DO UPDATE SET last_login_at = NOW()
             RETURNING id, data_key_salt`,
            [decoded.uid, decoded.email || `${decoded.uid}@firebase.com`, crypto.randomBytes(16).toString("hex")]
        );

        req.user = rows[0];
        next();
    } catch (error: any) {
        console.error("Firebase Auth Error:", error);
        return res.status(401).json({
            code: "INVALID_TOKEN",
            message: "Authentication verification failed",
            error: error.message
        });
    }
}
