import type { Problem } from '../../types/problem';

export const ssrSsgProblem: Problem = {
  id: '100-ssr-ssg',
  title: 'SSR vs SSG vs CSR',
  slug: 'ssr-ssg',
  difficulty: 'medium',
  tags: ['Performance', 'Architecture'],
  category: 'Performance',
  description: `
## Description

Compare rendering strategies:
- **CSR (Client-Side Rendering)**: SPA, slow initial load, fast navigation.
- **SSR (Server-Side Rendering)**: Good SEO, faster FCP, higher server load.
- **SSG (Static Site Generation)**: Best performance, build time cost, not for dynamic data.
- **ISR (Incremental Static Regeneration)**: SSG + dynamic updates.

## Task
Choose the best strategy for a given scenario.
`,
  templateCode: `/**
 * @param {string} scenario
 * @return {'CSR' | 'SSR' | 'SSG' | 'ISR'}
 */
function chooseStrategy(scenario) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Dashboard behind login -> CSR",
    "E-commerce product page (SEO + price change) -> SSR or ISR",
    "Blog post (rarely changes) -> SSG"
  ],
  createdAt: '2024-01-29'
};
