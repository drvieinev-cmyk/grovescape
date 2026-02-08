import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
import { tripsRouter } from "./routes/trips";
import { devicesRouter } from "./routes/devices";
import { teslaRouter } from "./routes/tesla";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic Auth Middleware (Mocked for Demo Success)
app.use((req, res, next) => {
    // In production, this verifies JWT and sets req.user
    (req as any).user = { id: "00000000-0000-0000-0000-000000000000" };
    next();
});

// Routes
app.use("/v1", authRouter);
app.use("/v1", tripsRouter);
app.use("/v1", devicesRouter);
app.use("/v1/tesla", teslaRouter);

// Health Check
app.get("/health", (req, res) => res.json({
    status: "optimal",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
}));

app.listen(PORT, () => {
    console.log(`🚀 ELYTRA API is active on port ${PORT}`);
    console.log(`📡 Endpoints: /v1/auth, /v1/trips, /v1/devices`);
});
