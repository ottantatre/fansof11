import { useMemo } from 'react';
import { TeamName } from './TeamName';
import type { DisplayDirection, Team } from './types';

interface TeamsProps {
  teams: [Team, Team];
  direction?: DisplayDirection;
}

export function Teams(props: TeamsProps) {
  const {
    teams: [teamA, teamB],
    direction,
  } = props;

  const directionClass = useMemo(() => (direction === 'column' ? 'flex-col' : 'flex-row justify-between'), [direction]);
  const reverseDisplay = useMemo(() => direction !== 'column', [direction]);

  return (
    <div className={`flex w-full ${directionClass}`}>
      <TeamName name={teamA.name} logo={teamA.name} />
      <TeamName name={teamB.name} logo={teamB.name} reverseDisplay={reverseDisplay} />
    </div>
  );
}
