import type { Problem } from '../../types/problem';

export const promiseProblem: Problem = {
  id: '027-promise',
  title: '手写 Promise (Implement Promise)',
  slug: 'implement-promise',
  difficulty: 'hard',
  tags: ['JavaScript', 'Promise'],
  category: 'JavaScript',
  description: `
## Description

Implement a basic \`MyPromise\` class that complies with the Promise A+ spec (simplified).
It should support:
1. \`then(onFulfilled, onRejected)\`
2. Async execution of callbacks.
3. State transitions (PENDING -> FULFILLED / REJECTED).

## Example

\`\`\`javascript
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('success'), 100);
});

p.then(res => console.log(res)); // 'success'
\`\`\`
`,
  templateCode: `class MyPromise {
  constructor(executor) {
    // Your code here
  }

  then(onFulfilled, onRejected) {
    // Your code here
  }
}`,
  testCases: [
    { input: [], output: 'success' }
  ],
  hints: [
    "Maintain state (pending, fulfilled, rejected) and value/reason.",
    "Store callbacks in arrays.",
    "Execute callbacks when state changes.",
    "Handle async resolution."
  ],
  createdAt: '2024-01-29'
};
