/**
 * Tesla OAuth Integration
 * Handles Tesla OAuth callback and token exchange
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { teslaTokens } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import axios from "axios";

const TESLA_TOKEN_URL = "https://auth.tesla.com/oauth2/v3/token";
const TESLA_CLIENT_ID = process.env.TESLA_CLIENT_ID || "";
const TESLA_CLIENT_SECRET = process.env.TESLA_CLIENT_SECRET || "";
const TESLA_REDIRECT_URI = process.env.TESLA_REDIRECT_URI || "https://www.grovescape.com/oauth/tesla/callback";

export const teslaRouter = router({
  /**
   * Exchange authorization code for access token
   * Called from the frontend callback page
   */
  exchangeCode: protectedProcedure
    .input(
      z.object({
        code: z.string(),
        codeVerifier: z.string(),
        state: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { code, codeVerifier } = input;
      const userId = ctx.user.id;

      try {
        // Exchange authorization code for access token with PKCE
        const response = await axios.post(
          TESLA_TOKEN_URL,
          {
            grant_type: "authorization_code",
            client_id: TESLA_CLIENT_ID,
            code: code,
            redirect_uri: TESLA_REDIRECT_URI,
            code_verifier: codeVerifier,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        // Calculate expiration timestamp
        const expiresAt = new Date(Date.now() + expires_in * 1000);

        // Store tokens in database
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        // Check if user already has Tesla tokens
        const existingTokens = await db
          .select()
          .from(teslaTokens)
          .where(eq(teslaTokens.userId, userId))
          .limit(1);

        if (existingTokens.length > 0) {
          // Update existing tokens
          await db
            .update(teslaTokens)
            .set({
              accessToken: access_token,
              refreshToken: refresh_token,
              expiresAt: expiresAt,
              region: "na", // Default to North America
              updatedAt: new Date(),
            })
            .where(eq(teslaTokens.userId, userId));
        } else {
          // Insert new tokens
          await db.insert(teslaTokens).values({
            userId: userId,
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt: expiresAt,
            region: "na",
          });
        }

        return {
          success: true,
          message: "Tesla account connected successfully",
        };
      } catch (error: any) {
        console.error("Tesla OAuth error:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error_description || "Failed to connect Tesla account"
        );
      }
    }),

  /**
   * Get Tesla connection status for current user
   */
  getConnectionStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      return { connected: false };
    }

    const tokens = await db
      .select()
      .from(teslaTokens)
      .where(eq(teslaTokens.userId, ctx.user.id))
      .limit(1);

    if (tokens.length === 0) {
      return { connected: false };
    }

    const token = tokens[0];
    const isExpired = token.expiresAt < new Date();

    return {
      connected: true,
      expiresAt: token.expiresAt.toISOString(),
      isExpired: isExpired,
      region: token.region,
    };
  }),

  /**
   * Disconnect Tesla account
   */
  disconnect: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    await db.delete(teslaTokens).where(eq(teslaTokens.userId, ctx.user.id));

    return {
      success: true,
      message: "Tesla account disconnected",
    };
  }),
});
