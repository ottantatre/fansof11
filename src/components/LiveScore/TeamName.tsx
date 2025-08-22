import { useMemo } from 'react';
import type { Team } from './types';

interface TeamNameProps extends Team {
  reverseDisplay?: boolean;
}

export function TeamName(props: TeamNameProps) {
  const { name, logo, reverseDisplay } = props;

  const lastItemOrder = useMemo(() => (reverseDisplay ? `order-last` : ''), [reverseDisplay]);

  return (
    <div className={`flex items-center gap-1`}>
      <span className={lastItemOrder}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15H7V1H5C5 3 4 4 1 4V6C3 6 4 6 5 5V15Z" fill="#212529" />
          <path d="M11 15H9V1H11C11 3 12 4 15 4V6C13 6 12 6 11 5V15Z" fill="#212529" />
        </svg>
      </span>
      <span>{name}</span>
    </div>
  );
}
