import type { Problem } from '../../types/problem';

export const treeShakingProblem: Problem = {
  id: '095-tree-shaking',
  title: 'Tree Shaking',
  slug: 'tree-shaking',
  difficulty: 'hard',
  tags: ['Performance', 'Bundling'],
  category: 'Performance',
  description: `
## Description

Explain Tree Shaking (Dead Code Elimination).
Requirements:
- ES Modules (static structure).
- No side effects (marked in package.json).

## Task
Implement a simple tree shaker simulator.
Given a module object and a list of used exports, return a new object with only used exports.
`,
  templateCode: `/**
 * @param {Object} moduleExports
 * @param {string[]} usedExports
 * @return {Object}
 */
function treeShake(moduleExports, usedExports) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Filter object keys.",
    "Return new object."
  ],
  createdAt: '2024-01-29'
};
