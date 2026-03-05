import type { Problem } from '../../types/problem';

export const eventLoopProblem: Problem = {
  id: '025-event-loop',
  title: '事件循环机制 (Event Loop)',
  slug: 'event-loop',
  difficulty: 'medium',
  tags: ['JavaScript', 'EventLoop', 'Async'],
  category: 'JavaScript',
  description: `
## Description

Predict the output order of the following code snippet.
Understand Microtasks (Promise) and Macrotasks (setTimeout).

## Code

\`\`\`javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');
\`\`\`

Return the output as a string array, e.g., \`['1', '4', '3', '2']\`.
`,
  templateCode: `function getOutputOrder() {
  // Return the array of strings representing the console log order
  return [];
}`,
  solutionCode: `function getOutputOrder() {
  return ['1', '4', '3', '2'];
}`,
  testCases: [
    { input: [], output: ['1', '4', '3', '2'] }
  ],
  hints: [
    "Synchronous code runs first.",
    "Microtasks (Promise) run before Macrotasks (setTimeout).",
    "Order: Sync -> Micro -> Macro"
  ],
  createdAt: '2024-01-29'
};
