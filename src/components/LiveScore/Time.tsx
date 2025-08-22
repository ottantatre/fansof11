import type { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import type { DisplayDirection } from './types';

interface TimeProps {
  startTime: Dayjs;
  actualTimeString?: string;
  displayDirection?: DisplayDirection;
}

export function Time(props: TimeProps) {
  const { startTime, actualTimeString, displayDirection } = props;

  const startData = useMemo(() => startTime.format('DD.MM'), [startTime]);
  const startHour = useMemo(() => startTime.format('HH:mm'), [startTime]);
  const isToday = useMemo(() => startTime.isToday(), [startTime]);

  console.log('Time', startTime, displayDirection, isToday);

  const dateClass = useMemo(() => (displayDirection === 'column' ? '' : isToday ? 'hidden' : ''), [displayDirection, isToday]);
  const hourClass = useMemo(() => (displayDirection === 'column' ? '' : isToday ? '' : 'hidden'), [displayDirection, isToday]);

  return (
    <div className="flex flex-col items-center justify-center w-12 text-xs">
      {actualTimeString ? (
        <span>{actualTimeString}</span>
      ) : (
        <>
          <span className={dateClass}>{startData}</span>
          <span className={hourClass}>{startHour}</span>
        </>
      )}
    </div>
  );
}
