import type { Problem } from '../../types/problem';

export const twoSumProblem: Problem = {
  id: '001-two-sum',
  title: 'Two Sum',
  slug: 'two-sum',
  difficulty: 'easy',
  tags: ['Array', 'HashTable', 'JavaScript'],
  category: 'JavaScript Basic',
  description: `
## Description

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

## Example 1:

\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

## Example 2:

\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

## Example 3:

\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

## Constraints:

*   \`2 <= nums.length <= 10^4\`
*   \`-10^9 <= nums[i] <= 10^9\`
*   \`-10^9 <= target <= 10^9\`
*   **Only one valid answer exists.**
`,
  templateCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  
};`,
  testCases: [
    { input: [[2, 7, 11, 15], 9], output: [0, 1] },
    { input: [[3, 2, 4], 6], output: [1, 2] },
    { input: [[3, 3], 6], output: [0, 1] }
  ],
  hints: [
    "A really brute force way would be to search for all possible pairs of numbers but that would be slow. Again, it's best to try out brute force solutions for completeness. It is from these brute force solutions that you can come up with optimizations.",
    "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
    "The second train of thought is, without changing the array, can we use some additional space to somehow accelerate the search?"
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
