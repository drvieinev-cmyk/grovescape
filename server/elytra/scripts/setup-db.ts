import fs from "fs";
import path from "path";
import { pool } from "../services/db";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

async function setupDatabase() {
    console.log("🛠️ Starting ELYTRA Database Setup...");

    try {
        const schemaUrl = new URL("../schema.sql", import.meta.url);
        const schemaSql = fs.readFileSync(schemaUrl, "utf8");

        const shouldReset = process.argv.includes("--reset");

        if (shouldReset) {
            console.log("🗑️ Resetting database (dropping existing tables)...");
            await pool.query(`
                DROP TABLE IF EXISTS trip_polylines, trips, daily_summaries, notification_devices, 
                audit_events, vehicle_state_cache, vehicles, tesla_accounts, 
                drivers, sessions, auth_identities, password_credentials, users, app_user, auth_identity, auth_audit_log CASCADE;
            `);
        }

        console.log("📖 Applying schema.sql...");
        await pool.query(schemaSql);

        console.log("✅ Database schema applied successfully!");
    } catch (error: any) {
        console.error("❌ Database setup failed:");
        console.error(error.message);
        process.exit(1);
    } finally {
        await pool.end();
        console.log("👋 Setup complete.");
    }
}

setupDatabase();
