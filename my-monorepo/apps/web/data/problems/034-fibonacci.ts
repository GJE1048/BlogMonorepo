import type { Problem } from '../../types/problem';

export const fibonacciProblem: Problem = {
  id: '034-fibonacci',
  title: '斐波那契数列 (Fibonacci)',
  slug: 'fibonacci',
  difficulty: 'easy',
  tags: ['Algorithm', 'Recursion', 'DP'],
  category: 'Algorithm',
  description: `
## Description

The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given \`n\`, calculate \`F(n)\`.

## Example

\`\`\`javascript
console.log(fib(2)); // 1
console.log(fib(3)); // 2
console.log(fib(4)); // 3
\`\`\`
`,
  templateCode: `/**
 * @param {number} n
 * @return {number}
 */
function fib(n) {
  // Your code here
  
}`,
  testCases: [
    { input: [2], output: 1 },
    { input: [3], output: 2 },
    { input: [4], output: 3 }
  ],
  hints: [
    "Recursive approach: fib(n-1) + fib(n-2).",
    "Iterative approach: store previous two values.",
    "Memoization can optimize recursion."
  ],
  createdAt: '2024-01-29'
};
