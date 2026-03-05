import type { Problem } from '../../types/problem';

export const resourceHintsProblem: Problem = {
  id: '092-resource-hints',
  title: 'Resource Hints (preload vs prefetch)',
  slug: 'resource-hints',
  difficulty: 'medium',
  tags: ['Performance', 'HTML'],
  category: 'Performance',
  description: `
## Description

Explain Resource Hints:
- **preload**: High priority, needed for current page immediately (e.g., font, hero image).
- **prefetch**: Low priority, needed for future navigation.
- **dns-prefetch**: Resolve DNS early.
- **preconnect**: Resolve DNS + TCP/TLS handshake.

## Task
Return the hint type based on usage scenario.
`,
  templateCode: `/**
 * @param {string} scenario
 * @return {'preload' | 'prefetch' | 'dns-prefetch' | 'preconnect'}
 */
function chooseResourceHint(scenario) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Current page critical -> preload",
    "Next page -> prefetch",
    "Third party domain -> preconnect/dns-prefetch"
  ],
  createdAt: '2024-01-29'
};
