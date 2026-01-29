import type { Problem } from '../../types/problem';

export const throttleProblem: Problem = {
  id: '003-throttle',
  title: '节流函数 (Throttle)',
  slug: 'throttle',
  difficulty: 'easy',
  tags: ['Function', 'Timer', 'JavaScript'],
  category: 'JavaScript',
  description: `
## Description

Implement a throttle function \`throttle(func, wait)\`.
The throttle function should limit the execution of \`func\` to once every \`wait\` milliseconds.

## Example

\`\`\`javascript
const log = throttle(() => console.log('Hello'), 1000);
log();
log(); // ignored
// 'Hello' is logged
// After 1000ms, log() can be called again
\`\`\`
`,
  templateCode: `/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
var throttle = function(func, wait) {
  
};`,
  testCases: [
     { input: [100], output: 'throttled' }
  ],
  hints: [
    "Use a flag or timestamp to track the last execution time.",
    "Ensure the function runs immediately on the first call if required, or wait."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
