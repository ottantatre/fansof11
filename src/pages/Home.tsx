import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LiveScore } from '@/components/LiveScore';
import dayjs from 'dayjs';

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
    <div className="w-100">
      <p>Livescores</p>
      <ul>
        <li>
          <LiveScore
            teams={['Inter', 'Juventus']}
            results={[3, 1]}
            startTime={dayjs('2025-08-19T18:30:00.0000Z')}
            actualTimeString="44'"
            displayDirection="column"
          />
        </li>
        <li>
          <LiveScore teams={['Barcelona', 'Real']} startTime={dayjs().set('hour', 20).set('minute', 45)} displayDirection="column" />
        </li>
        <li>
          <LiveScore teams={['Arka', 'Lechia']} startTime={dayjs('2025-08-21T19:15:00.000Z')} displayDirection="column" />
        </li>
        <li>
          <LiveScore teams={['Arsenal', 'Manchester']} startTime={dayjs('2025-08-22T21:30:00.000Z')} />
        </li>
        <li>
          <LiveScore teams={['PSG', 'Monaco']} startTime={dayjs('2025-08-21T21:30:00.000Z')} />
        </li>
        <li>
          <LiveScore teams={['Bayern', 'Lepzig']} startTime={dayjs('2025-08-19T21:30:00.000Z')} actualTimeString="119'ET" />
        </li>
      </ul>
    </div>
  );
}
