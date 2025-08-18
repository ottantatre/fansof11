import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Fixture = {
  id: number;
  date: string;
  status: string | null;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
};

export function HomePage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('fixtures')
        .select('id,date,status,home_team,away_team,home_score,away_score')
        .order('updated_at', { ascending: false })
        .limit(5);
      if (error) setError(error.message);
      setFixtures(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto p-6">
        <section className="mb-8">
          <h1 className="text-3xl font-bold">Witaj w Fansof11</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Zaloguj się, wybierz swoje ligi, drużyny i zawodników, a my pokażemy Ci live wyniki i
            aktualizacje.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="/login" className="px-4 py-2 rounded bg-black text-white">
              Zaloguj
            </a>
            <a href="#how" className="px-4 py-2 rounded border">
              Jak to działa?
            </a>
          </div>
        </section>

        <section className="mb-10" id="how">
          <h2 className="text-xl font-semibold">Co dalej?</h2>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>Zaloguj się (niebawem — magic link).</li>
            <li>Wybierz ulubione ligi / drużyny / zawodników.</li>
            <li>Otrzymuj odświeżane wyniki i wydarzenia.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Ostatnio zaktualizowane wyniki</h2>
          {loading && <p className="mt-3">Ładowanie…</p>}
          {error && <p className="mt-3 text-red-600">{error}</p>}
          {!loading && !error && (
            <ul className="mt-4 grid gap-2">
              {fixtures.map((f) => (
                <li key={f.id} className="border rounded p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {f.home_team} vs {f.away_team}
                    </div>
                    <div className="text-sm opacity-70">{new Date(f.date).toLocaleString()}</div>
                  </div>
                  <div className="text-lg font-semibold">
                    {f.status === 'FT' ? `${f.home_score ?? 0} : ${f.away_score ?? 0}` : f.status}
                  </div>
                </li>
              ))}
              {fixtures.length === 0 && <li className="opacity-70">Brak danych</li>}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
