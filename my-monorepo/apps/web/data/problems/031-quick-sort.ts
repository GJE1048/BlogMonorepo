import type { Problem } from '../../types/problem';

export const quickSortProblem: Problem = {
  id: '031-quick-sort',
  title: '快速排序 (Quick Sort)',
  slug: 'quick-sort',
  difficulty: 'medium',
  tags: ['Algorithm', 'Sort', 'Divide and Conquer'],
  category: 'Algorithm',
  description: `
## Description

Implement the **Quick Sort** algorithm to sort an array of numbers in ascending order.
Quick Sort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.

## Example

\`\`\`javascript
const arr = [3, 0, 2, 5, -1, 4, 1];
const sorted = quickSort(arr);
console.log(sorted); // [-1, 0, 1, 2, 3, 4, 5]
\`\`\`
`,
  templateCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function quickSort(arr) {
  // Your code here
  
}`,
  testCases: [
    { input: [[3, 0, 2, 5, -1, 4, 1]], output: [-1, 0, 1, 2, 3, 4, 5] },
    { input: [[1, 2, 3]], output: [1, 2, 3] },
    { input: [[3, 2, 1]], output: [1, 2, 3] }
  ],
  hints: [
    "Pick a pivot.",
    "Partition elements into 'left' (smaller) and 'right' (larger).",
    "Recursively sort 'left' and 'right'.",
    "Combine: [...quickSort(left), pivot, ...quickSort(right)]."
  ],
  createdAt: '2024-01-29'
};
