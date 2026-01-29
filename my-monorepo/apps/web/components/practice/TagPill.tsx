import React from 'react';
import { cn } from '../../lib/cn';

interface TagPillProps {
  tag: string;
  className?: string;
}

export const TagPill: React.FC<TagPillProps> = ({ tag, className }) => {
  return (
    <span
      className={cn(
        'px-2 py-1 rounded-md text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer',
        className
      )}
    >
      {tag}
    </span>
  );
};
