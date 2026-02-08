import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "path";
import fs from "fs";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { teslaRouter } from "../elytra/routes/tesla";
import { authRouter } from "../elytra/routes/auth";
import { tripsRouter } from "../elytra/routes/trips";
import { devicesRouter } from "../elytra/routes/devices";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Tesla Fleet API public key - MUST be first before any other middleware
  app.get('/.well-known/appspecific/com.tesla.3p.public-key.pem', (_req, res) => {
    const publicKey = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEXfBm/AgBCjJrZOVTFD1DlTY+TZDs
vtomE9xJVieq2NwJS0NxhYFImTeV8QRuR7QvyTM/Y/K8qWHkY2PmVnOBfw==
-----END PUBLIC KEY-----
`;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(publicKey);
  });

  // Health check endpoint for Railway monitoring
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  });

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Note: Tesla public key route is registered above, before all other middleware
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // Elytra v1 API Routes
  app.use("/v1/tesla", teslaRouter);
  app.use("/v1", authRouter);
  app.use("/v1", tripsRouter);
  app.use("/v1", devicesRouter);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
