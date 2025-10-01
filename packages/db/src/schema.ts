import {
  pgTable,
  serial,
  text,
  timestamp,
  numeric,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

export const raw_matches = pgTable('raw_matches', {
  id: serial('id').primaryKey(),
  source_id: text('source_id').notNull(),
  payload: text('payload').notNull(),
  captured_at: timestamp('captured_at', { withTimezone: true }).notNull(),
});

export const raw_odds = pgTable('raw_odds', {
  id: serial('id').primaryKey(),
  match_source_id: text('match_source_id').notNull(),
  bookmaker: text('bookmaker').notNull(),
  market: text('market').notNull(), // 1X2, OU_2_5, etc.
  selection: text('selection').notNull(), // H/D/A or Over/Under
  price: numeric('price').notNull(),
  captured_at: timestamp('captured_at', { withTimezone: true }).notNull(),
});

export const models = pgTable('models', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  version: text('version').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const stg_teams = pgTable('stg_teams', {
  id: serial('id').primaryKey(),
  source_team_id: text('source_team_id').notNull(), // np. api-football team id
  name: text('name').notNull(),
  country: text('country'),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const stg_players = pgTable('stg_players', {
  id: serial('id').primaryKey(),
  source_player_id: text('source_player_id').notNull(),
  name: text('name').notNull(),
  position: text('position'),
  team_source_id: text('team_source_id'),
  injured: boolean('injured').default(false).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const stg_matches = pgTable('stg_matches', {
  id: serial('id').primaryKey(),
  source_match_id: text('source_match_id').notNull(), // fixture id
  competition: text('competition'),
  season: text('season'),
  round: text('round'),
  utc_kickoff: timestamp('utc_kickoff', { withTimezone: true }).notNull(),
  home_team_source_id: text('home_team_source_id').notNull(),
  away_team_source_id: text('away_team_source_id').notNull(),
  home_coach: text('home_coach'),
  away_coach: text('away_coach'),
  // żywa lista kontuzji/absencji (PTI-relevant)
  home_absences: text('home_absences'), // CSV/JSON – w Day 4.2 znormalizujemy
  away_absences: text('away_absences'),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const stg_odds_1x2 = pgTable('stg_odds_1x2', {
  id: serial('id').primaryKey(),
  match_source_id: text('match_source_id').notNull(),
  bookmaker: text('bookmaker').notNull(),
  home: numeric('home').notNull(),
  draw: numeric('draw').notNull(),
  away: numeric('away').notNull(),
  captured_at: timestamp('captured_at', { withTimezone: true }).notNull(),
});

export const dim_teams = pgTable('dim_teams', {
  id: serial('id').primaryKey(),
  team_key: text('team_key').notNull().unique(), // np. source_team_id; w Day 4.2 dodamy mapowania
  name: text('name').notNull(),
  country: text('country'),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const dim_players = pgTable('dim_players', {
  id: serial('id').primaryKey(),
  player_key: text('player_key').notNull().unique(), // np. source_player_id
  name: text('name').notNull(),
  position: text('position'),
  primary_team_key: text('primary_team_key'),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const dim_competitions = pgTable('dim_competitions', {
  id: serial('id').primaryKey(),
  comp_key: text('comp_key').notNull().unique(), // np. "ENG-PL"
  name: text('name').notNull(),
  country: text('country'),
  tier: integer('tier'),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const fact_matches = pgTable('fact_matches', {
  id: serial('id').primaryKey(),
  match_key: text('match_key').notNull().unique(), // np. z source_match_id
  comp_key: text('comp_key'),
  season: text('season'),
  round: text('round'),
  utc_kickoff: timestamp('utc_kickoff', { withTimezone: true }).notNull(),
  home_team_key: text('home_team_key').notNull(),
  away_team_key: text('away_team_key').notNull(),
  // ground truth (po meczu)
  goals_home: integer('goals_home'),
  goals_away: integer('goals_away'),
  // metadata
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const fact_odds_snapshot = pgTable('fact_odds_snapshot', {
  id: serial('id').primaryKey(),
  match_key: text('match_key').notNull(),
  snapshot_ts: timestamp('snapshot_ts', { withTimezone: true }).notNull(), // kiedy zapisaliśmy
  horizon: integer('horizon').notNull(), // godziny do KO; np. 48, 24, 1
  // 1X2 w przeliczeniu na implied prob (Day 4.2 zrobimy ETL z raw/stg_odds)
  p_home: numeric('p_home'),
  p_draw: numeric('p_draw'),
  p_away: numeric('p_away'),
});
