import { Router } from "express";
import { pool } from "../services/db";
import { z } from "zod";

export const devicesRouter = Router();

const DeviceSchema = z.object({
    token: z.string(),
    platform: z.enum(["ios", "watchos"])
});

devicesRouter.post("/v1/devices/apns/register", async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const { token, platform } = DeviceSchema.parse(req.body);

        await pool.query(
            `INSERT INTO notification_devices (user_id, platform, apns_token)
             VALUES ($1, $2, $3)
             ON CONFLICT (user_id, apns_token) DO UPDATE SET last_seen_at = NOW()`,
            [userId, platform, token]
        );

        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ error: "INVALID_DEVICE_DATA" });
    }
});
