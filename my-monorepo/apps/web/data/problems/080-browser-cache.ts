import type { Problem } from '../../types/problem';

export const browserCacheProblem: Problem = {
  id: '080-browser-cache',
  title: '浏览器缓存机制 (Browser Cache)',
  slug: 'browser-cache',
  difficulty: 'medium',
  tags: ['Browser', 'Network', 'Cache'],
  category: 'Browser',
  description: `
## Description

**Strong Cache**: \`Cache-Control: max-age=3600\`, \`Expires\`.
**Negotiation Cache**: \`ETag / If-None-Match\`, \`Last-Modified / If-Modified-Since\`.

## Task
Explain the flow.
1. Browser checks Strong Cache. If hit, return 200 (from memory/disk).
2. If expired, send request with validation headers (Negotiation).
3. Server checks ETag/Last-Modified.
4. If match, return 304 (Not Modified).
5. If changed, return 200 with new data.

`,
  templateCode: `function checkCacheFlow() {
  // This is a conceptual check.
  return "Strong Cache -> Negotiation Cache -> Server Response";
}`,
  testCases: [],
  hints: [
    "304 Not Modified saves bandwidth."
  ],
  createdAt: '2024-01-29'
};
