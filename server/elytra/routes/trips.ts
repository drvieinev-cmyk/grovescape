import { Router } from "express";
import { pool } from "../services/db";
import { z } from "zod";

export const tripsRouter = Router();

// Validation Schema
const TripSchema = z.object({
    vehicle_id: z.string().uuid(),
    start_time: z.string(),
    end_time: z.string().optional(),
    start_odometer: z.number(),
    end_odometer: z.number().optional(),
    distance_km: z.number(),
    start_lat: z.number(),
    start_lng: z.number(),
    end_lat: z.number().optional(),
    end_lng: z.number().optional(),
    polyline: z.string().optional()
});

/**
 * POST /v1/trips
 * Ingests a finalized trip from the mobile app (Odometer delta source of truth).
 */
tripsRouter.post("/v1/trips", async (req, res) => {
    try {
        const userId = (req as any).user.id; // From auth middleware
        const data = TripSchema.parse(req.body);

        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            // 1. Insert Trip
            const tripRes = await client.query(
                `INSERT INTO trips (
                    user_id, vehicle_id, start_time, end_time, 
                    start_odometer, end_odometer, distance_km,
                    start_lat, start_lng, end_lat, end_lng
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING id`,
                [
                    userId, data.vehicle_id, data.start_time, data.end_time,
                    data.start_odometer, data.end_odometer, data.distance_km,
                    data.start_lat, data.start_lng, data.end_lat, data.end_lng
                ]
            );

            const tripId = tripRes.rows[0].id;

            // 2. Store Polyline
            if (data.polyline) {
                await client.query(
                    "INSERT INTO trip_polylines (trip_id, encoded_polyline) VALUES ($1, $2)",
                    [tripId, data.polyline]
                );
            }

            // 3. Update Daily Summary
            const date = data.start_time.split("T")[0];
            await client.query(
                `INSERT INTO daily_summaries (user_id, vehicle_id, date, total_km, trip_count)
                 VALUES ($1, $2, $3, $4, 1)
                 ON CONFLICT (user_id, vehicle_id, date) 
                 DO UPDATE SET 
                    total_km = daily_summaries.total_km + EXCLUDED.total_km,
                    trip_count = daily_summaries.trip_count + 1`,
                [userId, data.vehicle_id, date, data.distance_km]
            );

            await client.query("COMMIT");
            res.status(201).json({ success: true, id: tripId });
        } catch (e) {
            await client.query("ROLLBACK");
            throw e;
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(400).json({ error: "VALIDATION_FAILED" });
    }
});

tripsRouter.get("/v1/trips", async (req, res) => {
    const userId = (req as any).user.id;
    const { rows } = await pool.query(
        "SELECT * FROM trips WHERE user_id = $1 ORDER BY start_time DESC LIMIT 50",
        [userId]
    );
    res.json(rows);
});
