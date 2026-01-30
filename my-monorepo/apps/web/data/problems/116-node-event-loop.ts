import { Problem } from '../../types/problem';

export const nodeEventLoopProblem: Problem = {
  id: '116',
  title: 'Node.js Event Loop Order',
  slug: 'node-event-loop',
  difficulty: 'medium',
  category: 'Node.js',
  tags: ['Node.js', 'Event Loop'],
  description: `
Predict the output order of the following code snippet.
Return the array of strings representing the log order.

\`\`\`js
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

process.nextTick(() => {
  console.log('4');
});

console.log('5');
\`\`\`

Note: In the browser runner, \`process.nextTick\` might be simulated or aliased to \`queueMicrotask\`. Assume Node.js environment behavior:
1. Sync code
2. nextTick
3. Microtasks (Promise)
4. Macrotasks (setTimeout)
  `,
  templateCode: `/**
 * @return {string[]}
 */
function getLogOrder() {
  // Return the array of strings, e.g., ['1', '2', ...]
  return [];
}`,
  solutionCode: `/**
 * @return {string[]}
 */
function getLogOrder() {
  return ['1', '5', '4', '3', '2'];
}`,
  testCases: [
    {
      input: [],
      output: ['1', '5', '4', '3', '2'],
    },
  ],
  hints: [
    'Sync code runs first.',
    'process.nextTick has higher priority than Promise microtasks.',
    'Microtasks run before Macrotasks (setTimeout).',
  ],
  createdAt: '2024-01-29',
};
