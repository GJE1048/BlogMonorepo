import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { Problem, UserProgress } from '../../types/problem';
import { DifficultyBadge } from './DifficultyBadge';
import { TagPill } from './TagPill';

interface ProblemCardProps {
  problem: Problem;
  progress?: UserProgress;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, progress }) => {
  const isSolved = progress?.status === 'solved';
  
  return (
    <Link 
      href={`/practice/${problem.slug}`}
      className="block group"
    >
      <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className={cn("mt-1", isSolved ? "text-green-500" : "text-muted-foreground")}>
              {isSolved ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </div>
            <div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {problem.id}. {problem.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>{problem.category}</span>
                <span>•</span>
                <span>Success Rate: {problem.solvedCount ? '45%' : '0%'}</span>
              </div>
            </div>
          </div>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        
        <div className="flex flex-wrap gap-2 ml-8">
          {problem.tags.map(tag => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
};
