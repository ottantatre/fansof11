import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { Result } from './Result';
import { Teams } from './Teams';
import type { DisplayDirection } from './types';

interface LivescoreProps {
  teamA: string;
  teamB: string;
  startTime: Dayjs;
  resultTeamA?: number;
  resultTeamB?: number;
  actualTimeString?: string;
  displayDirection?: DisplayDirection;
}

export function LiveScore(props: LivescoreProps) {
  const { teamA, teamB, resultTeamA = 0, resultTeamB = 0, startTime, actualTimeString, displayDirection } = props;

  const startData = useMemo(() => startTime.format('DD.MM'), [startTime]);
  const startHour = useMemo(() => startTime.format('HH:MM'), [startTime]);

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col items-center justify-center w-12 text-xs">
        {actualTimeString ? (
          <span>{actualTimeString}</span>
        ) : (
          <>
            <span>{startData}</span>
            <span>{startHour}</span>
          </>
        )}
      </div>

      <div className="w-full flex items-center justify-between relative">
        <Teams
          teams={[
            { name: teamA, logo: '' },
            { name: teamB, logo: '' },
          ]}
          direction={displayDirection}
        />
        <Result result={[resultTeamA, resultTeamB]} direction={displayDirection} />
      </div>
    </div>
  );
}
