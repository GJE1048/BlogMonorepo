import type { Problem } from '../../types/problem';

export const cdnPrincipleProblem: Problem = {
  id: '089-cdn-principle',
  title: 'CDN Principle',
  slug: 'cdn-principle',
  difficulty: 'medium',
  tags: ['Network', 'CDN'],
  category: 'Network',
  description: `
## Description

Explain how CDN (Content Delivery Network) works.
Implement a simple function that simulates CDN routing: given a user location and a list of edge nodes, find the closest node.

## Task
Input: User { x, y }, Nodes [{ id, x, y }, ...]
Output: id of the closest node (Euclidean distance).
`,
  templateCode: `/**
 * @param {{x:number, y:number}} user
 * @param {Array<{id:string, x:number, y:number}>} nodes
 * @return {string}
 */
function findClosestCdnNode(user, nodes) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Distance = sqrt((x2-x1)^2 + (y2-y1)^2)",
    "Iterate and find min distance."
  ],
  createdAt: '2024-01-29'
};
