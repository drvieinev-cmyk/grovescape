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

        console.log("📖 Reading schema.sql...");

        // Split by semicolon to execute one by one (simplified)
        // or just execute the whole thing if the driver supports it
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
