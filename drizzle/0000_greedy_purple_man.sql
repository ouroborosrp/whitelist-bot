CREATE TABLE `ips` (
	`id` integer PRIMARY KEY NOT NULL,
	`ip` text NOT NULL,
	`discord_id` text NOT NULL,
	`discord_name` text NOT NULL,
	`status` text,
	`created_at` integer,
	`deleted_at` integer,
	`deployed` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ips_ip_discord_id_unique` ON `ips` (`ip`,`discord_id`);