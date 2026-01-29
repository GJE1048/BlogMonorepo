import type { Problem } from '../../types/problem';

export const renderingOptimizationProblem: Problem = {
  id: '096-rendering-optimization',
  title: 'Rendering Optimization (v-show vs v-if)',
  slug: 'rendering-optimization',
  difficulty: 'easy',
  tags: ['Performance', 'Vue', 'React'],
  category: 'Performance',
  description: `
## Description

Explain rendering optimizations:
- **v-if vs v-show**:
  - v-if: Conditional rendering (destroy/recreate). Good for rarely toggled.
  - v-show: CSS toggling (display: none). Good for frequent toggling.
- **Memoization**: React.memo, useMemo.
- **Virtualization**: Rendering large lists.

## Task
Return 'v-if' or 'v-show' based on the scenario.
`,
  templateCode: `/**
 * @param {string} scenario
 * @return {'v-if' | 'v-show'}
 */
function chooseDirective(scenario) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Frequent toggle -> v-show",
    "Rare toggle / initial load -> v-if"
  ],
  createdAt: '2024-01-29'
};
