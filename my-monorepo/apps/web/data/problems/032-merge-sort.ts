import type { Problem } from '../../types/problem';

export const mergeSortProblem: Problem = {
  id: '032-merge-sort',
  title: '归并排序 (Merge Sort)',
  slug: 'merge-sort',
  difficulty: 'medium',
  tags: ['Algorithm', 'Sort', 'Divide and Conquer'],
  category: 'Algorithm',
  description: `
## Description

Implement the **Merge Sort** algorithm to sort an array of numbers in ascending order.
Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.

## Example

\`\`\`javascript
const arr = [3, 0, 2, 5, -1, 4, 1];
const sorted = mergeSort(arr);
console.log(sorted); // [-1, 0, 1, 2, 3, 4, 5]
\`\`\`
`,
  templateCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function mergeSort(arr) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
var mergeSort = function(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
};`,
  testCases: [
    { input: [[3, 0, 2, 5, -1, 4, 1]], output: [-1, 0, 1, 2, 3, 4, 5] },
    { input: [[1]], output: [1] },
    { input: [[]], output: [] }
  ],
  hints: [
    "Base case: if arr.length <= 1, return arr.",
    "Find middle index.",
    "Split into left and right arrays.",
    "Recursively call mergeSort on left and right.",
    "Merge the sorted results."
  ],
  createdAt: '2024-01-29'
};
