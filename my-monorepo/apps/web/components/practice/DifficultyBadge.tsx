import React from 'react';
import { cn } from '../../lib/cn';
import type { Difficulty } from '../../types/problem';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const colors: Record<Difficulty, string> = {
  easy: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
  hard: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
};

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className }) => {
  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
        colors[difficulty],
        className
      )}
    >
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
};
