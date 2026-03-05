import type { Problem } from '../../types/problem';

export const httpStatusCodesProblem: Problem = {
  id: '081-http-status-codes',
  title: 'HTTP 状态码 (HTTP Status Codes)',
  slug: 'http-status-codes',
  difficulty: 'easy',
  tags: ['Network', 'HTTP'],
  category: 'Network',
  description: `
## Description

Explain the meaning of common HTTP status codes.
Implement a function that returns the description for a given status code.

Common codes to handle:
- 200: OK
- 301: Moved Permanently
- 302: Found (Temporary Redirect)
- 304: Not Modified
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
- 502: Bad Gateway
- 503: Service Unavailable
`,
  templateCode: `/**
 * @param {number} code
 * @return {string}
 */
function getStatusDescription(code) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Use a switch statement or an object map.",
    "2xx: Success",
    "3xx: Redirection",
    "4xx: Client Error",
    "5xx: Server Error"
  ],
  createdAt: '2024-01-29'
};
