import type { Problem } from '../../types/problem';

export const climbingStairsProblem: Problem = {
  id: '035-climbing-stairs',
  title: '爬楼梯问题 (Climbing Stairs)',
  slug: 'climbing-stairs',
  difficulty: 'easy',
  tags: ['Algorithm', 'DP'],
  category: 'Algorithm',
  description: `
## Description

You are climbing a staircase. It takes \`n\` steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Example

\`\`\`javascript
// n = 2
// 1. 1 step + 1 step
// 2. 2 steps
console.log(climbStairs(2)); // 2
\`\`\`
`,
  templateCode: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  if (n <= 2) return n;
  let a = 1;
  let b = 2;
  for (let i = 3; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
};`,
  testCases: [
    { input: [2], output: 2 },
    { input: [3], output: 3 }
  ],
  hints: [
    "This is essentially the Fibonacci sequence.",
    "dp[i] = dp[i-1] + dp[i-2]."
  ],
  createdAt: '2024-01-29'
};
