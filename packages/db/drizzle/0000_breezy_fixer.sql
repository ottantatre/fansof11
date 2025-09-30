CREATE TABLE "models" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"version" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "raw_matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_id" text NOT NULL,
	"payload" text NOT NULL,
	"captured_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "raw_odds" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_source_id" text NOT NULL,
	"bookmaker" text NOT NULL,
	"market" text NOT NULL,
	"selection" text NOT NULL,
	"price" numeric NOT NULL,
	"captured_at" timestamp with time zone NOT NULL
);
