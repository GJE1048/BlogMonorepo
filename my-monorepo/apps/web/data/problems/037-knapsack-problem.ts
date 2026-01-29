import type { Problem } from '../../types/problem';

export const knapsackProblem: Problem = {
  id: '037-knapsack-problem',
  title: '背包问题 (Knapsack Problem)',
  slug: 'knapsack-problem',
  difficulty: 'hard',
  tags: ['Algorithm', 'DP'],
  category: 'Algorithm',
  description: `
## Description

Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.
Assume the 0/1 Knapsack Problem where you can either take an item or not.

Given \`weights\`, \`values\`, and \`capacity\`.

## Example

\`\`\`javascript
const weights = [1, 3, 4];
const values = [15, 20, 30];
const capacity = 4;
// Pick item 0 and item 1: weight = 4, value = 35.
// Pick item 2: weight = 4, value = 30.
console.log(knapsack(weights, values, capacity)); // 35
\`\`\`
`,
  templateCode: `/**
 * @param {number[]} weights
 * @param {number[]} values
 * @param {number} capacity
 * @return {number}
 */
function knapsack(weights, values, capacity) {
  // Your code here
  
}`,
  testCases: [
    { input: [[1, 3, 4], [15, 20, 30], 4], output: 35 }
  ],
  hints: [
    "Use a 2D array dp[i][w].",
    "dp[i][w] = max value using first i items with weight limit w.",
    "Transition: max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])."
  ],
  createdAt: '2024-01-29'
};
