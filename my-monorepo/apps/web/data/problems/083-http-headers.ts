import type { Problem } from '../../types/problem';

export const httpHeadersProblem: Problem = {
  id: '083-http-headers',
  title: 'HTTP Headers',
  slug: 'http-headers',
  difficulty: 'medium',
  tags: ['Network', 'HTTP'],
  category: 'Network',
  description: `
## Description

Explain common HTTP headers.
Implement a function that parses a raw HTTP headers string into an object.

## Example
Input:
\`\`\`
Host: example.com
Content-Type: application/json
User-Agent: Mozilla/5.0
\`\`\`

Output:
\`\`\`json
{
  "Host": "example.com",
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0"
}
\`\`\`
`,
  templateCode: `/**
 * @param {string} rawHeaders
 * @return {Object}
 */
function parseHeaders(rawHeaders) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Split by newline.",
    "Split each line by first colon.",
    "Trim values."
  ],
  createdAt: '2024-01-29'
};
