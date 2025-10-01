CREATE TABLE "dim_competitions" (
	"id" serial PRIMARY KEY NOT NULL,
	"comp_key" text NOT NULL,
	"name" text NOT NULL,
	"country" text,
	"tier" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "dim_competitions_comp_key_unique" UNIQUE("comp_key")
);
--> statement-breakpoint
CREATE TABLE "dim_players" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_key" text NOT NULL,
	"name" text NOT NULL,
	"position" text,
	"primary_team_key" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "dim_players_player_key_unique" UNIQUE("player_key")
);
--> statement-breakpoint
CREATE TABLE "dim_teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_key" text NOT NULL,
	"name" text NOT NULL,
	"country" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "dim_teams_team_key_unique" UNIQUE("team_key")
);
--> statement-breakpoint
CREATE TABLE "fact_matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_key" text NOT NULL,
	"comp_key" text,
	"season" text,
	"round" text,
	"utc_kickoff" timestamp with time zone NOT NULL,
	"home_team_key" text NOT NULL,
	"away_team_key" text NOT NULL,
	"goals_home" integer,
	"goals_away" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "fact_matches_match_key_unique" UNIQUE("match_key")
);
--> statement-breakpoint
CREATE TABLE "fact_odds_snapshot" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_key" text NOT NULL,
	"snapshot_ts" timestamp with time zone NOT NULL,
	"horizon" integer NOT NULL,
	"p_home" numeric,
	"p_draw" numeric,
	"p_away" numeric
);
--> statement-breakpoint
CREATE TABLE "stg_matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_match_id" text NOT NULL,
	"competition" text,
	"season" text,
	"round" text,
	"utc_kickoff" timestamp with time zone NOT NULL,
	"home_team_source_id" text NOT NULL,
	"away_team_source_id" text NOT NULL,
	"home_coach" text,
	"away_coach" text,
	"home_absences" text,
	"away_absences" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stg_odds_1x2" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_source_id" text NOT NULL,
	"bookmaker" text NOT NULL,
	"home" numeric NOT NULL,
	"draw" numeric NOT NULL,
	"away" numeric NOT NULL,
	"captured_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stg_players" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_player_id" text NOT NULL,
	"name" text NOT NULL,
	"position" text,
	"team_source_id" text,
	"injured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stg_teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_team_id" text NOT NULL,
	"name" text NOT NULL,
	"country" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
