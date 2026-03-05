import type { Problem } from '../../types/problem';

export const binarySearchProblem: Problem = {
  id: '033-binary-search',
  title: '二分查找 (Binary Search)',
  slug: 'binary-search',
  difficulty: 'easy',
  tags: ['Algorithm', 'Array', 'Search'],
  category: 'Algorithm',
  description: `
## Description

Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return \`-1\` .

## Example

\`\`\`javascript
const nums = [-1, 0, 3, 5, 9, 12];
const target = 9;
console.log(search(nums, target)); // 4
\`\`\`
`,
  templateCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};`,
  testCases: [
    { input: [[-1, 0, 3, 5, 9, 12], 9], output: 4 },
    { input: [[-1, 0, 3, 5, 9, 12], 2], output: -1 }
  ],
  hints: [
    "Maintain left and right pointers.",
    "Calculate mid = Math.floor((left + right) / 2).",
    "If nums[mid] === target, return mid.",
    "If nums[mid] < target, left = mid + 1.",
    "If nums[mid] > target, right = mid - 1."
  ],
  createdAt: '2024-01-29'
};
