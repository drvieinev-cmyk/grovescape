import axios from "axios";
import { pool } from "./db";
import { encrypt, decrypt, deriveKey } from "../common/crypto";
import { admin } from "./firebase";

interface TeslaTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

const MASTER_KEY = process.env.KMS_MASTER_KEY || "fallback_production_master_key_32_chars";
const FLEET_AUTH_URL = "https://fleet-auth.prd.vn.cloud.tesla.com";

export class TeslaService {
    /**
     * Exchanges an authorization code for Tesla tokens.
     */
    static async exchangeCode(userId: string, code: string, codeVerifier: string) {
        const response = await axios.post(
            `${FLEET_AUTH_URL}/oauth2/v3/token`,
            new URLSearchParams({
                grant_type: "authorization_code",
                client_id: process.env.TESLA_CLIENT_ID || "",
                client_secret: process.env.TESLA_CLIENT_SECRET || "",
                code,
                code_verifier: codeVerifier,
                redirect_uri: process.env.TESLA_REDIRECT_URI || "",
                audience: process.env.TESLA_AUDIENCE || "https://fleet-api.prd.na.vn.cloud.tesla.com",
            }).toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { access_token, refresh_token, expires_in } = response.data as TeslaTokenResponse;
        await this.storeTokens(userId, access_token, refresh_token, expires_in);

        return { success: true };
    }

    /**
     * Retrieves valid access token for a user, refreshing if necessary.
     */
    static async getAccessToken(userId: string): Promise<string> {
        const { rows } = await pool.query(
            "SELECT encrypted_token_blob, token_meta_json, (app_user.data_key_salt) as salt FROM tesla_accounts JOIN app_user ON app_user.id = tesla_accounts.user_id WHERE user_id = $1",
            [userId]
        );

        if (!rows[0]) throw new Error("Tesla account not connected");

        const { encrypted_token_blob, token_meta_json, salt } = rows[0];
        const userKey = deriveKey(MASTER_KEY, salt);
        const tokens = JSON.parse(decrypt(encrypted_token_blob, userKey));

        const expiresAt = new Date(token_meta_json.expires_at).getTime();
        if (Date.now() > expiresAt - 60000) { // 60s buffer
            return await this.refreshTokens(userId, tokens.refresh_token, salt);
        }

        return tokens.access_token;
    }

    private static async refreshTokens(userId: string, refreshToken: string, salt: string): Promise<string> {
        const response = await axios.post(
            `${FLEET_AUTH_URL}/oauth2/v3/token`,
            new URLSearchParams({
                grant_type: "refresh_token",
                client_id: process.env.TESLA_CLIENT_ID || "",
                client_secret: process.env.TESLA_CLIENT_SECRET || "",
                refresh_token: refreshToken,
            }).toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { access_token, refresh_token, expires_in } = response.data as TeslaTokenResponse;
        await this.storeTokens(userId, access_token, refresh_token, expires_in);
        return access_token;
    }

    private static async storeTokens(userId: string, access_token: string, refresh_token: string, expires_in: number) {
        const { rows } = await pool.query("SELECT data_key_salt FROM app_user WHERE id = $1", [userId]);
        const salt = rows[0].data_key_salt;
        const userKey = deriveKey(MASTER_KEY, salt);

        const tokenBlob = JSON.stringify({ access_token, refresh_token });
        const encryptedBlob = encrypt(tokenBlob, userKey);

        const meta = {
            expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
            scopes: ["openid", "offline_access", "vehicle_device_data", "vehicle_cmds", "vehicle_location"]
        };

        await pool.query(
            `INSERT INTO tesla_accounts (user_id, encrypted_token_blob, token_meta_json)
             VALUES ($1, $2, $3)
             ON CONFLICT (user_id) DO UPDATE SET 
                encrypted_token_blob = EXCLUDED.encrypted_token_blob,
                token_meta_json = EXCLUDED.token_meta_json,
                revoked_at = NULL`,
            [userId, encryptedBlob, meta]
        );

        // Update Firestore for real-time mobile client feedback
        try {
            const db = admin.firestore();
            await db.collection("users").doc(userId).set({
                teslaConnection: {
                    status: "connected",
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                }
            }, { merge: true });
        } catch (error) {
            console.error("Firestore Update Error (Status):", error);
        }
    }

    static async getVehicles(userId: string) {
        const token = await this.getAccessToken(userId);
        const regionUrl = "https://fleet-api.prd.na.vn.cloud.tesla.com"; // Default to NA for now, should be dynamic based on user region

        const response = await axios.get(`${regionUrl}/api/1/vehicles`, {
            headers: { Authorization: `Bearer ${token}` }
        }) as any;

        const vehicles = response.data.response;

        // Sync vehicles to Firestore
        try {
            const db = admin.firestore();
            const formattedVehicles = vehicles.map((v: any) => ({
                id: v.id_s || v.id.toString(),
                displayName: v.display_name,
                model: v.vin ? v.vin.charAt(3) : "Unknown", // Simplistic model inference for Firestore
                state: v.state,
                vin: v.vin
            }));

            await db.collection("users").doc(userId).set({
                vehicles: formattedVehicles
            }, { merge: true });
        } catch (error) {
            console.error("Firestore Update Error (Vehicles):", error);
        }

        return response.data;
    }

    static async getVehicleData(userId: string, vin: string) {
        const token = await this.getAccessToken(userId);
        const regionUrl = "https://fleet-api.prd.na.vn.cloud.tesla.com";

        const response = await axios.get(`${regionUrl}/api/1/vehicles/${vin}/vehicle_data`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
}
