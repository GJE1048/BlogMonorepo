import type { Problem } from '../../types/problem';

export const profilingToolsProblem: Problem = {
  id: '099-profiling-tools',
  title: 'Profiling Tools',
  slug: 'profiling-tools',
  difficulty: 'medium',
  tags: ['Performance', 'Tools'],
  category: 'Performance',
  description: `
## Description

Explain Chrome DevTools panels for performance:
- **Performance**: CPU, FPS, Network waterfall.
- **Memory**: Heap snapshots, allocation.
- **Lighthouse**: Audit scores.
- **Network**: Request timing/size.

## Task
Return the tool name ('Performance', 'Memory', 'Lighthouse', 'Network') for a given debugging goal.
`,
  templateCode: `/**
 * @param {string} goal
 * @return {string}
 */
function chooseTool(goal) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "FPS drop -> Performance",
    "Leak -> Memory",
    "SEO score -> Lighthouse",
    "Slow API -> Network"
  ],
  createdAt: '2024-01-29'
};
