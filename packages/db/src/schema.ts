import { pgTable, serial, text, timestamp, numeric } from 'drizzle-orm/pg-core';

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
