import type { Problem } from '../../types/problem';

export const graphTraversalProblem: Problem = {
  id: '038-graph-traversal',
  title: '图的 DFS/BFS (Graph Traversal)',
  slug: 'graph-traversal',
  difficulty: 'medium',
  tags: ['Algorithm', 'Graph', 'BFS', 'DFS'],
  category: 'Algorithm',
  description: `
## Description

Implement Breadth-First Search (BFS) for a graph.
Given an adjacency list representing a graph and a starting node, return the order of visited nodes.

## Example

\`\`\`javascript
const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: []
};
// BFS starting from A: A -> B -> C -> D -> E -> F
console.log(bfs(graph, 'A')); // ['A', 'B', 'C', 'D', 'E', 'F']
\`\`\`
`,
  templateCode: `/**
 * @param {Record<string, string[]>} graph
 * @param {string} start
 * @return {string[]}
 */
function bfs(graph, start) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {Record<string, string[]>} graph
 * @param {string} start
 * @return {string[]}
 */
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set();
  const result = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}`,
  testCases: [
    { 
      input: [
        {
          A: ['B', 'C'],
          B: ['D', 'E'],
          C: ['F'],
          D: [],
          E: ['F'],
          F: []
        }, 
        'A'
      ], 
      output: ['A', 'B', 'C', 'D', 'E', 'F'] 
    }
  ],
  hints: [
    "Use a queue for BFS.",
    "Keep track of visited nodes to avoid cycles."
  ],
  createdAt: '2024-01-29'
};
