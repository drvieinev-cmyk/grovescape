import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  /** Password hash for local authentication (bcrypt) */
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * OAuth 2.0 Clients - Applications that can request access on behalf of users
 */
export const oauthClients = mysqlTable("oauth_clients", {
  id: int("id").autoincrement().primaryKey(),
  clientId: varchar("clientId", { length: 64 }).notNull().unique(),
  clientSecret: varchar("clientSecret", { length: 255 }).notNull(),
  name: text("name").notNull(),
  redirectUris: text("redirectUris").notNull(), // JSON array of allowed redirect URIs
  ownerId: int("ownerId").notNull(), // User who created this client
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OAuthClient = typeof oauthClients.$inferSelect;
export type InsertOAuthClient = typeof oauthClients.$inferInsert;

/**
 * OAuth 2.0 Authorization Codes - Temporary codes exchanged for access tokens
 */
export const oauthAuthorizationCodes = mysqlTable("oauth_authorization_codes", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 128 }).notNull().unique(),
  clientId: varchar("clientId", { length: 64 }).notNull(),
  userId: int("userId").notNull(),
  redirectUri: text("redirectUri").notNull(),
  scope: text("scope"), // Space-separated scopes
  codeChallenge: varchar("codeChallenge", { length: 128 }), // PKCE code challenge
  codeChallengeMethod: varchar("codeChallengeMethod", { length: 10 }), // 'S256' or 'plain'
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OAuthAuthorizationCode = typeof oauthAuthorizationCodes.$inferSelect;
export type InsertOAuthAuthorizationCode = typeof oauthAuthorizationCodes.$inferInsert;

/**
 * OAuth 2.0 Access Tokens - Bearer tokens for API access
 */
export const oauthAccessTokens = mysqlTable("oauth_access_tokens", {
  id: int("id").autoincrement().primaryKey(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  clientId: varchar("clientId", { length: 64 }).notNull(),
  userId: int("userId"), // Null for client_credentials grant
  scope: text("scope"), // Space-separated scopes
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OAuthAccessToken = typeof oauthAccessTokens.$inferSelect;
export type InsertOAuthAccessToken = typeof oauthAccessTokens.$inferInsert;

/**
 * API Keys for Machine-to-Machine authentication
 */
export const apiKeys = mysqlTable("api_keys", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 64 }).notNull().unique(),
  name: text("name").notNull(),
  ownerId: int("ownerId").notNull(),
  lastUsedAt: timestamp("lastUsedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"),
});

export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = typeof apiKeys.$inferInsert;

/**
 * Tesla OAuth Tokens - Store Tesla API access tokens for users
 */
export const teslaTokens = mysqlTable("tesla_tokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  accessToken: text("accessToken").notNull(),
  refreshToken: text("refreshToken").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  region: varchar("region", { length: 10 }).notNull(), // 'na', 'eu', 'cn'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TeslaToken = typeof teslaTokens.$inferSelect;
export type InsertTeslaToken = typeof teslaTokens.$inferInsert;