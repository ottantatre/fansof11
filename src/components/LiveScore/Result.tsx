import { useMemo } from 'react';

interface ResultProps {
  result?: [number, number];
  direction?: 'row' | 'column';
}

export function Result(props: ResultProps) {
  const { direction = 'row', result = [] } = props;
  const [resultA = '-', resultB = '-'] = result;

  const directionClass = useMemo(() => (direction === 'column' ? 'flex-col' : 'flex-row absolute w-full justify-center'), [direction]);
  const separatorDisplayClass = useMemo(() => (direction === 'column' ? 'hidden' : ''), [direction]);
  const resultBClass = useMemo(() => (direction === 'column' ? 'text-right' : 'text-left'), [direction]);

  return (
    <div className={`font-mono flex ${directionClass}`}>
      <span className={`w-8 text-right`}>{resultA}</span>
      <span className={separatorDisplayClass}>:</span>
      <span className={`w-8 ${resultBClass}`}>{resultB}</span>
    </div>
  );
}
