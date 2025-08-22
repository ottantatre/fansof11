import { Dayjs } from 'dayjs';
import { Result } from './Result';
import { Teams } from './Teams';
import type { DisplayDirection } from './types';
import { Time } from './Time';

interface LivescoreProps {
  teams: [string, string];
  startTime: Dayjs;
  actualTimeString?: string;
  displayDirection?: DisplayDirection;
  results?: [number, number];
}

export function LiveScore(props: LivescoreProps) {
  const {
    teams: [teamA, teamB],
    results: [resultTeamA, resultTeamB] = [0, 0],
    startTime,
    actualTimeString,
    displayDirection,
  } = props;

  return (
    <div className="flex w-full justify-between">
      <Time actualTimeString={actualTimeString} startTime={startTime} displayDirection={displayDirection} />

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
