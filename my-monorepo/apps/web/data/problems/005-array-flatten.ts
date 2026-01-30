import type { Problem } from '../../types/problem';

export const arrayFlattenProblem: Problem = {
  id: '005-array-flatten',
  title: '数组扁平化 (Array Flatten)',
  slug: 'array-flatten',
  difficulty: 'easy',
  tags: ['Array', 'Recursion', 'JavaScript'],
  category: 'JavaScript',
  description: `
## Description

Implement a function \`flatten(arr, depth)\` that flattens a nested array to a specific depth.
If depth is not provided, it should flatten completely (or default to 1 depending on spec, here we assume complete flatten if no depth or max depth).

## Example

\`\`\`javascript
flatten([1, [2, [3, 4]]]); // [1, 2, 3, 4]
\`\`\`
`,
  templateCode: `/**
 * @param {any[]} arr
 * @param {number} depth
 * @return {any[]}
 */
var flatten = function(arr, depth = 1) {
  
};`,
  solutionCode: `/**
 * @param {any[]} arr
 * @param {number} depth
 * @return {any[]}
 */
var flatten = function(arr, depth = 1) {
  if (depth === 0) return arr;
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val);
  }, []);
};`,
  testCases: [
    { input: [[1, [2, [3, 4]]], Infinity], output: [1, 2, 3, 4] },
    { input: [[1, [2, [3, 4]]], 1], output: [1, 2, [3, 4]] }
  ],
  hints: [
    "Use Array.prototype.reduce or recursion.",
    "Check if an element is an array using Array.isArray."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
