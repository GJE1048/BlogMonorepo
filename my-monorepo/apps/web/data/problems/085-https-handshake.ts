import type { Problem } from '../../types/problem';

export const httpsHandshakeProblem: Problem = {
  id: '085-https-handshake',
  title: 'HTTPS Handshake',
  slug: 'https-handshake',
  difficulty: 'hard',
  tags: ['Network', 'Security', 'HTTPS'],
  category: 'Network',
  description: `
## Description

Explain the TLS/SSL handshake process (simplified 1.2).
Order the steps correctly.

Steps (shuffled):
1. "Server sends Certificate"
2. "Client sends ClientHello (Cipher suites, Random)"
3. "Client verifies Certificate, generates Pre-Master Secret, encrypts with Server Public Key"
4. "Server receives Pre-Master Secret, generates Session Keys"
5. "Client sends Finished"
6. "Server sends Finished"

## Task
Return the array of steps in correct order (1-6).
`,
  templateCode: `/**
 * @return {string[]}
 */
function getHandshakeOrder() {
  const steps = [
    "Server sends Certificate",
    "Client sends ClientHello",
    "Client verifies Certificate & sends Pre-Master Secret",
    "Server generates Session Keys",
    "Client sends Finished",
    "Server sends Finished"
  ];
  // Return steps in correct order
  return [];
}`,
  testCases: [],
  hints: [
    "Client starts with Hello.",
    "Server responds with Cert.",
    "Client validates and sends secret.",
    "Both switch to encrypted communication."
  ],
  createdAt: '2024-01-29'
};
