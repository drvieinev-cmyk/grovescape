CREATE TABLE `api_keys` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(64) NOT NULL,
	`name` text NOT NULL,
	`ownerId` int NOT NULL,
	`lastUsedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	CONSTRAINT `api_keys_id` PRIMARY KEY(`id`),
	CONSTRAINT `api_keys_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `oauth_access_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` varchar(255) NOT NULL,
	`clientId` varchar(64) NOT NULL,
	`userId` int,
	`scope` text,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `oauth_access_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `oauth_access_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `oauth_authorization_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(128) NOT NULL,
	`clientId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`redirectUri` text NOT NULL,
	`scope` text,
	`codeChallenge` varchar(128),
	`codeChallengeMethod` varchar(10),
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `oauth_authorization_codes_id` PRIMARY KEY(`id`),
	CONSTRAINT `oauth_authorization_codes_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `oauth_clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` varchar(64) NOT NULL,
	`clientSecret` varchar(255) NOT NULL,
	`name` text NOT NULL,
	`redirectUris` text NOT NULL,
	`ownerId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `oauth_clients_id` PRIMARY KEY(`id`),
	CONSTRAINT `oauth_clients_clientId_unique` UNIQUE(`clientId`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `openId` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);