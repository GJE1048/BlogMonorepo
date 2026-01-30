import type { Problem } from '../../types/problem';

export const monorepoProblem: Problem = {
  id: '104-monorepo',
  title: 'Monorepo vs Polyrepo',
  slug: 'monorepo',
  difficulty: 'medium',
  tags: ['Engineering', 'Architecture'],
  category: 'Engineering',
  description: `
## Description

Compare Monorepo and Polyrepo (Multi-repo).
- **Monorepo**: Shared code, atomic commits, unified tooling, easier refactoring.
- **Polyrepo**: Clear boundaries, independent CI/CD, granular access control.

## Task
Return 'Monorepo' or 'Polyrepo' based on the benefit.
`,
  templateCode: `/**
 * @param {string} benefit
 * @return {'Monorepo' | 'Polyrepo'}
 */
function chooseRepoStrategy(benefit) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {string} benefit
 * @return {'Monorepo' | 'Polyrepo'}
 */
function chooseRepoStrategy(benefit) {
  if (benefit.includes('Code sharing')) return 'Monorepo';
  if (benefit.includes('Access control')) return 'Polyrepo';
  return 'Monorepo';
}`,
  testCases: [],
  hints: [
    "Code sharing -> Monorepo",
    "Access control -> Polyrepo"
  ],
  createdAt: '2024-01-29'
};
