import { Pool } from "pg";

export const pool = new Pool({
    connectionString: process.env.ELYTRA_DATABASE_URL || process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
