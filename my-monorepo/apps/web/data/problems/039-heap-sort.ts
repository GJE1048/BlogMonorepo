import type { Problem } from '../../types/problem';

export const heapSortProblem: Problem = {
  id: '039-heap-sort',
  title: '堆排序 (Heap Sort)',
  slug: 'heap-sort',
  difficulty: 'medium',
  tags: ['Algorithm', 'Sort', 'Heap'],
  category: 'Algorithm',
  description: `
## Description

Implement **Heap Sort** algorithm.
Heap sort is a comparison-based sorting algorithm. Heap sort can be thought of as an improved selection sort: like selection sort, heap sort divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region.

## Example

\`\`\`javascript
const arr = [4, 10, 3, 5, 1];
console.log(heapSort(arr)); // [1, 3, 4, 5, 10]
\`\`\`
`,
  templateCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function heapSort(arr) {
  // Your code here
  
}`,
  testCases: [
    { input: [[4, 10, 3, 5, 1]], output: [1, 3, 4, 5, 10] }
  ],
  hints: [
    "Build a max heap.",
    "Swap root with end, reduce heap size, heapify.",
    "Repeat until heap size is 1."
  ],
  createdAt: '2024-01-29'
};
