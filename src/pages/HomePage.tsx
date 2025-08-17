import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { supabase } from '@/lib/supabase';

type League = { id: number; name: string; country: string | null };

export function HomePage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.from('leagues').select('id,name,country').limit(20);
      if (error) {
        console.error(error);
      } else {
        setLeagues(data ?? []);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <Button asChild>
        <Link to="/about">Go to About</Link>
      </Button>

      <div>
        <h1 className="text-2xl font-bold">Fansof11 — Leagues</h1>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {leagues.map((l) => (
              <li key={l.id} className="rounded border p-3">
                <div className="font-medium">{l.name}</div>
                <div className="text-sm opacity-70">{l.country ?? '—'}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
