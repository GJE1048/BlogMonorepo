import type { Problem } from '../../types/problem';

export const debounceProblem: Problem = {
  id: '002-debounce',
  title: '防抖函数 (Debounce)',
  slug: 'debounce',
  difficulty: 'easy',
  tags: ['Function', 'Closure', 'JavaScript'],
  category: 'JavaScript',
  description: `
## Description

Implement a debounce function \`debounce(func, wait)\`.
The debounce function should delay the execution of \`func\` until after \`wait\` milliseconds have elapsed since the last time it was invoked.

## Example

\`\`\`javascript
const log = debounce(() => console.log('Hello'), 1000);
log();
log();
log();
// 'Hello' is logged only once after 1000ms
\`\`\`
`,
  templateCode: `/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
var debounce = function(func, wait) {
  
};`,
  solutionCode: `/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
var debounce = function(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};`,
  testCases: [
    { input: [100], output: 'debounced' } // Simplified test case representation, actual runner logic handles async
  ],
  hints: [
    "Use setTimeout to delay execution.",
    "Clear the previous timeout if the function is called again before the delay passes."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
