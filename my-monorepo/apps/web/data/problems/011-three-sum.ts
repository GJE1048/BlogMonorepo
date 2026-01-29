import type { Problem } from '../../types/problem';

export const threeSumProblem: Problem = {
  id: '011-three-sum',
  title: '三数之和 (3Sum)',
  slug: 'three-sum',
  difficulty: 'medium',
  tags: ['Array', 'Two Pointers', 'Algorithm'],
  category: 'Algorithm',
  description: `
## Description

Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.

## Example

\`\`\`
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
\`\`\`
`,
  templateCode: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  
};`,
  testCases: [
    { input: [[-1,0,1,2,-1,-4]], output: [[-1,-1,2],[-1,0,1]] }
  ],
  hints: [
    "Sort the array first.",
    "Fix one number and use two pointers for the remaining two numbers."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
