-- ELYTRA SQL Schema: Production Grade
-- Database: PostgreSQL
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    data_key_salt TEXT NOT NULL -- For user-level encryption
);
-- 2. Auth Identities (SIWA, Google, Password)
CREATE TABLE IF NOT EXISTS auth_identities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    -- 'apple', 'google', 'password'
    provider_subject TEXT UNIQUE,
    -- id from apple/google
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- 3. Password Credentials
CREATE TABLE IF NOT EXISTS password_credentials (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- 4. Sessions
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL,
    device_info JSONB,
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ DEFAULT NOW()
);
-- 5. Tesla Accounts (Encrypted Tokens)
CREATE TABLE IF NOT EXISTS tesla_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tesla_email TEXT,
    encrypted_token_blob TEXT NOT NULL,
    -- Encrypted AES-GCM
    token_meta_json JSONB,
    -- Expiration info, scopes
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);
-- 6. Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vin TEXT NOT NULL,
    model TEXT,
    nickname TEXT,
    is_selected BOOLEAN DEFAULT FALSE,
    last_seen_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- 7. Vehicle State Cache (For quick app launch)
CREATE TABLE IF NOT EXISTS vehicle_state_cache (
    vehicle_id UUID PRIMARY KEY REFERENCES vehicles(id) ON DELETE CASCADE,
    state_json JSONB NOT NULL,
    last_fetched_at TIMESTAMPTZ NOT NULL,
    source TEXT,
    -- 'polling', 'streaming'
    etag TEXT
);
-- 8. Drivers
CREATE TABLE IF NOT EXISTS drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    is_default BOOLEAN DEFAULT FALSE
);
-- 9. Trips
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    driver_id UUID REFERENCES drivers(id) ON DELETE
    SET NULL,
        start_time TIMESTAMPTZ NOT NULL,
        end_time TIMESTAMPTZ,
        start_odometer DECIMAL(10, 2),
        end_odometer DECIMAL(10, 2),
        distance_km DECIMAL(10, 2),
        duration_sec INTEGER,
        start_place TEXT,
        end_place TEXT,
        start_lat DECIMAL(9, 6),
        start_lng DECIMAL(9, 6),
        end_lat DECIMAL(9, 6),
        end_lng DECIMAL(9, 6),
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- 10. Trip Polylines (Optimized storage)
CREATE TABLE IF NOT EXISTS trip_polylines (
    trip_id UUID PRIMARY KEY REFERENCES trips(id) ON DELETE CASCADE,
    encoded_polyline TEXT NOT NULL,
    points_count INTEGER,
    simplified_level INTEGER DEFAULT 1
);
-- 11. Daily Summaries
CREATE TABLE IF NOT EXISTS daily_summaries (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    total_km DECIMAL(10, 2) DEFAULT 0,
    trip_count INTEGER DEFAULT 0,
    drive_time_sec INTEGER DEFAULT 0,
    PRIMARY KEY (user_id, vehicle_id, date)
);
-- 12. Notification Devices
CREATE TABLE IF NOT EXISTS notification_devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    -- 'ios', 'watchos'
    apns_token TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ DEFAULT NOW()
);
-- 13. Audit Events (Security & Debugging)
CREATE TABLE IF NOT EXISTS audit_events (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE
    SET NULL,
        type TEXT NOT NULL,
        -- 'LOGIN_SUCCESS', 'TESLA_DISCONNECT', 'TRIP_DETECTED'
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        metadata_json JSONB
);
-- Indexes
CREATE INDEX IF NOT EXISTS idx_trips_user_date ON trips(user_id, start_time);
CREATE INDEX IF NOT EXISTS idx_trips_vehicle_time ON trips(vehicle_id, start_time);
CREATE INDEX IF NOT EXISTS idx_sessions_user_revoked ON sessions(user_id, revoked_at);
CREATE INDEX IF NOT EXISTS idx_audit_type ON audit_events(type, created_at);