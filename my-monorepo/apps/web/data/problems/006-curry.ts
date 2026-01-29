import type { Problem } from '../../types/problem';

export const curryProblem: Problem = {
  id: '006-curry',
  title: '柯里化 (Curry)',
  slug: 'curry',
  difficulty: 'medium',
  tags: ['Function', 'Higher-Order Function', 'JavaScript'],
  category: 'JavaScript',
  description: `
## Description

Implement a curry function \`curry(fn)\` that converts a function with multiple arguments into a sequence of nesting functions.
It should allow partial application of arguments until the number of arguments equals the original function's arity.

## Example

\`\`\`javascript
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6
curriedAdd(1, 2, 3); // 6
\`\`\`
`,
  templateCode: `/**
 * @param {Function} fn
 * @return {Function}
 */
var curry = function(fn) {
  
};`,
  testCases: [
    { input: [[1, 2, 3]], output: 6 } // Simplified
  ],
  hints: [
    "Compare the number of arguments received so far with fn.length.",
    "If arguments are enough, call fn. If not, return a function that collects more arguments."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
