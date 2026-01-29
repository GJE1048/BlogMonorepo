import type { Problem } from '../../types/problem';

export const asyncAwaitProblem: Problem = {
  id: '026-async-await',
  title: 'async/await 原理 (Async/Await Principle)',
  slug: 'async-await',
  difficulty: 'medium',
  tags: ['JavaScript', 'Generator', 'Promise'],
  category: 'JavaScript',
  description: `
## Description

Implement a \`run\` function that takes a Generator function and executes it like \`async/await\`.
This is often called a "coroutine runner" or similar to the \`co\` library.

## Example

\`\`\`javascript
function* myGen() {
  const a = yield Promise.resolve(1);
  const b = yield Promise.resolve(2);
  return a + b;
}

run(myGen).then(res => console.log(res)); // 3
\`\`\`
`,
  templateCode: `/**
 * @param {GeneratorFunction} genFn
 * @return {Promise}
 */
function run(genFn) {
  // Your code here
  
}`,
  testCases: [
    { input: [], output: 3 }
  ],
  hints: [
    "Recursively call next().",
    "If the yielded value is a Promise, wait for it to resolve before calling next() with the result.",
    "If the generator is done, resolve the final promise."
  ],
  createdAt: '2024-01-29'
};
