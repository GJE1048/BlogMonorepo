import type { Problem } from '../../types/problem';

export const arrayDeduplicationProblem: Problem = {
  id: '009-array-deduplication',
  title: '数组去重 (Array Deduplication)',
  slug: 'array-deduplication',
  difficulty: 'easy',
  tags: ['Array', 'Set', 'JavaScript'],
  category: 'JavaScript',
  description: `
## Description

Implement a function to remove duplicate elements from an array.
You can use ES6 Set or other methods.

## Example

\`\`\`javascript
unique([1, 2, 2, 3]); // [1, 2, 3]
\`\`\`
`,
  templateCode: `/**
 * @param {any[]} arr
 * @return {any[]}
 */
var unique = function(arr) {
  
};`,
  testCases: [
    { input: [[1, 2, 2, 3]], output: [1, 2, 3] },
    { input: [[1, 1, 1]], output: [1] }
  ],
  hints: [
    "The simplest way is using new Set(arr).",
    "Alternatively, filter with indexOf."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
