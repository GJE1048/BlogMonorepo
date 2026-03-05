import type { Problem } from '../../types/problem';

export const apiDesignProblem: Problem = {
  id: '090-api-design',
  title: 'REST vs GraphQL',
  slug: 'api-design',
  difficulty: 'medium',
  tags: ['Network', 'API'],
  category: 'Network',
  description: `
## Description

Compare REST and GraphQL.
Return 'REST' or 'GraphQL' based on the feature.

Features:
- "Multiple endpoints, over-fetching/under-fetching" -> "REST"
- "Single endpoint, precise data fetching, schema defined" -> "GraphQL"
- "Standard HTTP methods (GET, POST, PUT, DELETE)" -> "REST"
- "Query language, typically POST only" -> "GraphQL"
`,
  templateCode: `/**
 * @param {string} feature
 * @return {'REST' | 'GraphQL'}
 */
function chooseApiStyle(feature) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Flexible queries = GraphQL",
    "Resource based URLs = REST"
  ],
  createdAt: '2024-01-29'
};
