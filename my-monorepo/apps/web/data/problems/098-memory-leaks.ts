import type { Problem } from '../../types/problem';

export const memoryLeaksProblem: Problem = {
  id: '098-memory-leaks',
  title: 'Memory Leaks',
  slug: 'memory-leaks',
  difficulty: 'medium',
  tags: ['Performance', 'JavaScript'],
  category: 'Performance',
  description: `
## Description

Common causes of memory leaks in JS:
- Global variables.
- Uncleared timers/intervals.
- Detached DOM elements.
- Closures holding references.

## Task
Identify the type of leak from a code snippet string description.
`,
  templateCode: `/**
 * @param {string} snippetDescription
 * @return {string}
 */
function identifyLeak(snippetDescription) {
  // Return 'Global', 'Timer', 'DOM', or 'Closure'
  
}`,
  testCases: [],
  hints: [
    "window.x -> Global",
    "setInterval -> Timer",
    "removed element still referenced -> DOM"
  ],
  createdAt: '2024-01-29'
};
