import { twoSumProblem } from './001-two-sum';
import type { Problem } from '../../types/problem';

export const problems: Problem[] = [
  twoSumProblem,
  // Add more problems here
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find(p => p.slug === slug);
}
