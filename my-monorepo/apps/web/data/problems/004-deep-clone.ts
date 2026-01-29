import type { Problem } from '../../types/problem';

export const deepCloneProblem: Problem = {
  id: '004-deep-clone',
  title: '深拷贝 (Deep Clone)',
  slug: 'deep-clone',
  difficulty: 'medium',
  tags: ['Object', 'Recursion', 'JavaScript'],
  category: 'JavaScript',
  description: `
## Description

Implement a function \`deepClone(obj)\` that creates a deep copy of a value.
It should handle objects, arrays, and primitive values.
Handling circular references is optional but good to have.

## Example

\`\`\`javascript
const obj = { a: 1, b: { c: 2 } };
const clone = deepClone(obj);
clone.b.c = 3;
console.log(obj.b.c); // 2
\`\`\`
`,
  templateCode: `/**
 * @param {any} obj
 * @return {any}
 */
var deepClone = function(obj) {
  
};`,
  testCases: [
    { input: [{ a: 1, b: { c: 2 } }], output: { a: 1, b: { c: 2 } } },
    { input: [[1, [2, 3]]], output: [1, [2, 3]] }
  ],
  hints: [
    "Check if the value is an object or array.",
    "Recursively clone properties.",
    "Handle null separately as typeof null is 'object'."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
