import { Router } from "express";
import axios from "axios";
import { TeslaService } from "../services/tesla";
import { requireFirebaseAuth, AuthedRequest } from "../middleware/auth";
import { pool } from "../services/db";

export const teslaRouter = Router();

/**
 * GET /v1/tesla/health
 * Comprehensive health check for the Tesla integration.
 */
teslaRouter.get("/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");
        res.json({
            status: "ok",
            gateway: "grovescape",
            database: "connected",
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        res.status(503).json({
            status: "error",
            gateway: "grovescape",
            database: "disconnected",
            error: error.message
        });
    }
});

/**
 * POST /v1/tesla/auth/start
 * Generates the Tesla authorize URL.
 */
teslaRouter.post("/auth/start", requireFirebaseAuth, async (req: AuthedRequest, res) => {
    try {
        const clientId = process.env.TESLA_CLIENT_ID || "";
        const redirectUri = process.env.TESLA_REDIRECT_URI || "";
        const scopes = "openid offline_access vehicle_device_data vehicle_cmds vehicle_location";

        // This is just helper data for the app to build the URL or the backend can return it
        const authUrl = `https://auth.tesla.com/oauth2/v3/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scopes)}&prompt=login`;

        res.json({ success: true, authUrl });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/tesla/callback
 * Redirects back to the app using custom scheme 'elytra'
 */
teslaRouter.get("/callback", (req, res) => {
    const { code, state } = req.query;
    if (!code) return res.status(400).send("No auth code received");

    // Redirect to custom app scheme to trigger ASWebAuthenticationSession
    const appUrl = `elytra://callback?code=${code}${state ? `&state=${state}` : ""}`;
    res.redirect(302, appUrl);
});

/**
 * POST /v1/tesla/auth/callback
 * Accepts authorization code from iOS and exchanges for tokens.
 */
teslaRouter.post("/auth/callback", requireFirebaseAuth, async (req: AuthedRequest, res) => {
    const userId = (req as any).user.id;
    const { code, codeVerifier } = req.body;

    if (!code || !codeVerifier) {
        return res.status(400).json({ error: "Missing code or codeVerifier" });
    }

    try {
        await TeslaService.exchangeCode(userId, code, codeVerifier);
        res.json({ success: true });
    } catch (error: any) {
        console.error("Tesla Callback Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to exchange Tesla code" });
    }
});

/**
 * GET /v1/tesla/vehicles
 * Returns the list of vehicles for the user.
 */
teslaRouter.get("/vehicles", requireFirebaseAuth, async (req: AuthedRequest, res) => {
    const userId = req.user!.id;
    try {
        const vehicles = await TeslaService.getVehicles(userId);
        res.json(vehicles);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /v1/tesla/vehicles/:vin/status
 * Returns vehicle data for a specific VIN.
 */
teslaRouter.get("/vehicles/:vin/status", requireFirebaseAuth, async (req: AuthedRequest, res) => {
    const userId = req.user!.id;
    const { vin } = req.params;
    try {
        const data = await TeslaService.getVehicleData(userId, vin);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * POST /v1/tesla/vehicles/:vin/commands/:command
 * Proxy command to Tesla vehicle.
 */
teslaRouter.post("/vehicles/:vin/commands/:command", requireFirebaseAuth, async (req: AuthedRequest, res) => {
    const userId = (req as any).user.id;
    const { vin, command } = req.params;
    const { parameters } = req.body;

    try {
        const token = await TeslaService.getAccessToken(userId);
        const regionUrl = "https://fleet-api.prd.na.vn.cloud.tesla.com"; // Should be dynamic

        const response = await axios.post(
            `${regionUrl}/api/1/vehicles/${vin}/command/${command}`,
            parameters || {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        res.json(response.data);
    } catch (error: any) {
        console.error("Tesla Command Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});
