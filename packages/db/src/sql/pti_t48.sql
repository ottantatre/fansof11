-- Tworzymy MV dla PTI (T-48h). Zakładamy, że fact_odds_snapshot.horizon=48 to „fotografia” 48h przed KO.
-- Jeśli nie istnieje -> create, jeśli istnieje -> w runnerze użyjemy REFRESH.

CREATE MATERIALIZED VIEW IF NOT EXISTS pti_matches_t48 AS
SELECT
  m.match_key,
  m.utc_kickoff,
  m.comp_key,
  m.season,
  m.round,
  m.home_team_key,
  m.away_team_key,
  o.snapshot_ts AS pti_ts,
  o.p_home,
  o.p_draw,
  o.p_away
FROM fact_matches m
LEFT JOIN LATERAL (
  SELECT s.*
  FROM fact_odds_snapshot s
  WHERE s.match_key = m.match_key
    AND s.horizon = 48         -- snapshot 48h
  ORDER BY s.snapshot_ts DESC  -- preferuj najnowszy zapis, jeśli wiele
  LIMIT 1
) o ON true;

-- indeksy pod najczęstsze zapytania
CREATE INDEX IF NOT EXISTS idx_pti_t48_match_key ON pti_matches_t48 (match_key);
CREATE INDEX IF NOT EXISTS idx_pti_t48_ko ON pti_matches_t48 (utc_kickoff);