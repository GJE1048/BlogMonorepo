import type { Problem } from '../../types/problem';

export const virtualDomDiffProblem: Problem = {
  id: '016-virtual-dom-diff',
  title: '虚拟 DOM Diff (Virtual DOM Diff)',
  slug: 'virtual-dom-diff',
  difficulty: 'hard',
  tags: ['Algorithm', 'Tree', 'React'],
  category: 'React',
  description: `
## Description

Implement a simplified Virtual DOM Diff algorithm.
Given two virtual DOM trees (objects), return the list of patches (changes) needed to update the first tree to match the second.

## Example

\`\`\`javascript
const oldTree = { type: 'div', props: { id: 'a' }, children: [] };
const newTree = { type: 'div', props: { id: 'b' }, children: [] };
const patches = diff(oldTree, newTree);
// patches should indicate props change
\`\`\`
`,
  templateCode: `/**
 * @param {Object} oldTree
 * @param {Object} newTree
 * @return {Object[]}
 */
var diff = function(oldTree, newTree) {
  
};`,
  testCases: [
    { input: [{}, {}], output: [] } // Simplified
  ],
  hints: [
    "Traverse both trees simultaneously (DFS).",
    "Compare type, props, and children.",
    "Generate patch objects for differences."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
