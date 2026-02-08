/**
 * OAuth 2.0 Authorization Server
 * Implements Authorization Code flow with PKCE and Client Credentials grant
 */

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import {
  oauthClients,
  oauthAuthorizationCodes,
  oauthAccessTokens,
  apiKeys,
} from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import crypto from "crypto";

/**
 * Generate secure random token
 */
function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString("base64url");
}

/**
 * Verify PKCE code challenge
 */
function verifyCodeChallenge(
  codeVerifier: string,
  codeChallenge: string,
  method: string
): boolean {
  if (method === "plain") {
    return codeVerifier === codeChallenge;
  }
  
  if (method === "S256") {
    const hash = crypto
      .createHash("sha256")
      .update(codeVerifier)
      .digest("base64url");
    return hash === codeChallenge;
  }
  
  return false;
}

export const oauthRouter = router({
  /**
   * Create OAuth client (application registration)
   */
  createClient: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Application name is required"),
        redirectUris: z.array(z.string().url("Invalid redirect URI")),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const clientId = `client_${nanoid(24)}`;
      const clientSecret = generateToken(32);
      const clientSecretHash = await bcrypt.hash(clientSecret, 10);

      await db.insert(oauthClients).values({
        clientId,
        clientSecret: clientSecretHash,
        name: input.name,
        redirectUris: JSON.stringify(input.redirectUris),
        ownerId: ctx.user.id,
      });

      return {
        clientId,
        clientSecret, // Only returned once during creation
        name: input.name,
        redirectUris: input.redirectUris,
      };
    }),

  /**
   * List user's OAuth clients
   */
  listClients: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    const clients = await db
      .select({
        id: oauthClients.id,
        clientId: oauthClients.clientId,
        name: oauthClients.name,
        redirectUris: oauthClients.redirectUris,
        createdAt: oauthClients.createdAt,
      })
      .from(oauthClients)
      .where(eq(oauthClients.ownerId, ctx.user.id));

    return clients.map((client) => ({
      ...client,
      redirectUris: JSON.parse(client.redirectUris) as string[],
    }));
  }),

  /**
   * Authorization endpoint - initiate OAuth flow
   */
  authorize: publicProcedure
    .input(
      z.object({
        clientId: z.string(),
        redirectUri: z.string().url(),
        scope: z.string().optional(),
        state: z.string().optional(),
        codeChallenge: z.string().optional(),
        codeChallengeMethod: z.enum(["plain", "S256"]).optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Verify client exists
      const [client] = await db
        .select()
        .from(oauthClients)
        .where(eq(oauthClients.clientId, input.clientId))
        .limit(1);

      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid client_id",
        });
      }

      // Verify redirect URI
      const allowedUris = JSON.parse(client.redirectUris) as string[];
      if (!allowedUris.includes(input.redirectUri)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid redirect_uri",
        });
      }

      // User must be authenticated
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please login to authorize this application",
        });
      }

      return {
        client: {
          name: client.name,
          clientId: client.clientId,
        },
        scope: input.scope || "read",
        redirectUri: input.redirectUri,
        state: input.state,
      };
    }),

  /**
   * Grant authorization - user consents
   */
  grantAuthorization: protectedProcedure
    .input(
      z.object({
        clientId: z.string(),
        redirectUri: z.string().url(),
        scope: z.string().optional(),
        state: z.string().optional(),
        codeChallenge: z.string().optional(),
        codeChallengeMethod: z.enum(["plain", "S256"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Generate authorization code
      const code = `auth_${generateToken(32)}`;
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await db.insert(oauthAuthorizationCodes).values({
        code,
        clientId: input.clientId,
        userId: ctx.user.id,
        redirectUri: input.redirectUri,
        scope: input.scope || "read",
        codeChallenge: input.codeChallenge,
        codeChallengeMethod: input.codeChallengeMethod,
        expiresAt,
      });

      // Build redirect URL with code
      const redirectUrl = new URL(input.redirectUri);
      redirectUrl.searchParams.set("code", code);
      if (input.state) {
        redirectUrl.searchParams.set("state", input.state);
      }

      return {
        redirectUrl: redirectUrl.toString(),
      };
    }),

  /**
   * Token endpoint - exchange code for access token
   */
  token: publicProcedure
    .input(
      z.object({
        grantType: z.enum(["authorization_code", "client_credentials"]),
        code: z.string().optional(),
        redirectUri: z.string().url().optional(),
        clientId: z.string(),
        clientSecret: z.string(),
        codeVerifier: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Verify client credentials
      const [client] = await db
        .select()
        .from(oauthClients)
        .where(eq(oauthClients.clientId, input.clientId))
        .limit(1);

      if (!client) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid client credentials",
        });
      }

      const isValidSecret = await bcrypt.compare(
        input.clientSecret,
        client.clientSecret
      );
      if (!isValidSecret) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid client credentials",
        });
      }

      if (input.grantType === "authorization_code") {
        // Authorization Code flow
        if (!input.code || !input.redirectUri) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Missing code or redirect_uri",
          });
        }

        // Find and validate authorization code
        const [authCode] = await db
          .select()
          .from(oauthAuthorizationCodes)
          .where(
            and(
              eq(oauthAuthorizationCodes.code, input.code),
              eq(oauthAuthorizationCodes.clientId, input.clientId)
            )
          )
          .limit(1);

        if (!authCode) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid authorization code",
          });
        }

        if (authCode.expiresAt < new Date()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Authorization code expired",
          });
        }

        if (authCode.redirectUri !== input.redirectUri) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Redirect URI mismatch",
          });
        }

        // Verify PKCE if used
        if (authCode.codeChallenge) {
          if (!input.codeVerifier) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Missing code_verifier",
            });
          }

          const isValidChallenge = verifyCodeChallenge(
            input.codeVerifier,
            authCode.codeChallenge,
            authCode.codeChallengeMethod || "plain"
          );

          if (!isValidChallenge) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid code_verifier",
            });
          }
        }

        // Generate access token
        const accessToken = `access_${generateToken(32)}`;
        const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour

        await db.insert(oauthAccessTokens).values({
          token: accessToken,
          clientId: input.clientId,
          userId: authCode.userId,
          scope: authCode.scope,
          expiresAt,
        });

        // Delete used authorization code
        await db
          .delete(oauthAuthorizationCodes)
          .where(eq(oauthAuthorizationCodes.code, input.code));

        return {
          accessToken,
          tokenType: "Bearer",
          expiresIn: 3600,
          scope: authCode.scope,
        };
      } else if (input.grantType === "client_credentials") {
        // Client Credentials flow (M2M)
        const accessToken = `access_${generateToken(32)}`;
        const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour

        await db.insert(oauthAccessTokens).values({
          token: accessToken,
          clientId: input.clientId,
          userId: null, // No user for M2M
          scope: "api",
          expiresAt,
        });

        return {
          accessToken,
          tokenType: "Bearer",
          expiresIn: 3600,
          scope: "api",
        };
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Unsupported grant_type",
      });
    }),

  /**
   * Create API key for M2M authentication
   */
  createApiKey: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "API key name is required"),
        expiresInDays: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const key = `sk_${generateToken(32)}`;
      const expiresAt = input.expiresInDays
        ? new Date(Date.now() + input.expiresInDays * 24 * 60 * 60 * 1000)
        : null;

      await db.insert(apiKeys).values({
        key,
        name: input.name,
        ownerId: ctx.user.id,
        expiresAt,
      });

      return {
        key, // Only returned once during creation
        name: input.name,
        expiresAt,
      };
    }),

  /**
   * List user's API keys
   */
  listApiKeys: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    const keys = await db
      .select({
        id: apiKeys.id,
        name: apiKeys.name,
        keyPrefix: apiKeys.key, // We'll mask this in the response
        lastUsedAt: apiKeys.lastUsedAt,
        createdAt: apiKeys.createdAt,
        expiresAt: apiKeys.expiresAt,
      })
      .from(apiKeys)
      .where(eq(apiKeys.ownerId, ctx.user.id));

    return keys.map((key) => ({
      ...key,
      keyPrefix: key.keyPrefix.substring(0, 12) + "...", // Show only prefix
    }));
  }),

  /**
   * Revoke API key
   */
  revokeApiKey: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      await db
        .delete(apiKeys)
        .where(and(eq(apiKeys.id, input.id), eq(apiKeys.ownerId, ctx.user.id)));

      return { success: true };
    }),
});
