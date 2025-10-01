import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { db, pool } from '../client';
import { sql } from 'drizzle-orm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sqlPath = resolve(__dirname, '../sql/pti_t48.sql');

type RegclassRow = { oid: string | null };

async function main() {
  const ddl = readFileSync(sqlPath, 'utf8');
  const statements = ddl
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await db.execute(sql.raw(stmt + ';'));
  }

  const exists = await db.execute(
    sql`select to_regclass('public.pti_matches_t48') as oid;`
  );
  const row = (exists.rows?.[0] ?? null) as RegclassRow | null;
  const oid = row?.oid;

  if (oid) {
    await db.execute(
      sql.raw('REFRESH MATERIALIZED VIEW public.pti_matches_t48;')
    );
    console.info('[db] PTI T-48h materialized view refreshed.');
  } else {
    console.info(
      '[db] PTI T-48h materialized view created (no refresh needed).'
    );
  }
}

main()
  .catch((e: unknown) => {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[db] PTI apply error:', msg);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
