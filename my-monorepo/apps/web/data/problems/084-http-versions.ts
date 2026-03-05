import type { Problem } from '../../types/problem';

export const httpVersionsProblem: Problem = {
  id: '084-http-versions',
  title: 'HTTP Versions (1.1 vs 2 vs 3)',
  slug: 'http-versions',
  difficulty: 'medium',
  tags: ['Network', 'HTTP'],
  category: 'Network',
  description: `
## Description

Compare HTTP/1.1, HTTP/2, and HTTP/3.
Return the version based on the feature description.

Features:
- "Persistent connections, Pipelining (HOL blocking)" -> "1.1"
- "Multiplexing, Header Compression, Server Push, Binary Protocol" -> "2"
- "QUIC, UDP based, No HOL blocking" -> "3"
`,
  templateCode: `/**
 * @param {string} feature
 * @return {'1.1' | '2' | '3'}
 */
function identifyHttpVersion(feature) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "HTTP/1.1: Text based, limited parallelism.",
    "HTTP/2: Binary, multiplexing within single TCP connection.",
    "HTTP/3: UDP (QUIC)."
  ],
  createdAt: '2024-01-29'
};
