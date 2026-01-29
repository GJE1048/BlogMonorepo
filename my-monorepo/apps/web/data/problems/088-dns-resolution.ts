import type { Problem } from '../../types/problem';

export const dnsResolutionProblem: Problem = {
  id: '088-dns-resolution',
  title: 'DNS Resolution Process',
  slug: 'dns-resolution',
  difficulty: 'medium',
  tags: ['Network', 'DNS'],
  category: 'Network',
  description: `
## Description

Explain the DNS resolution process.
Order the steps.

Steps:
1. Browser Cache
2. OS Cache (hosts file)
3. Router Cache
4. ISP DNS Server (Recursive Resolver)
5. Root Name Server
6. TLD Name Server (.com)
7. Authoritative Name Server (example.com)

## Task
Return array of steps in order.
`,
  templateCode: `/**
 * @return {string[]}
 */
function getDnsOrder() {
  // Return steps sorted
  return [];
}`,
  testCases: [],
  hints: [
    "Local caches first (Browser -> OS -> Router).",
    "Then Recursive Resolver.",
    "Then Iterative queries (Root -> TLD -> Authoritative)."
  ],
  createdAt: '2024-01-29'
};
