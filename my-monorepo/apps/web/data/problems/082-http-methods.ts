import type { Problem } from '../../types/problem';

export const httpMethodsProblem: Problem = {
  id: '082-http-methods',
  title: 'GET vs POST',
  slug: 'http-methods',
  difficulty: 'easy',
  tags: ['Network', 'HTTP'],
  category: 'Network',
  description: `
## Description

Explain the differences between GET and POST methods.
Implement a helper function that chooses the correct method based on the operation type description.

Differences:
- GET: Retrieve data, parameters in URL, idempotent, cached.
- POST: Submit data, parameters in body, not idempotent, not cached by default.

## Task
Return 'GET' or 'POST' based on the scenario string.
- "fetch user profile" -> GET
- "create new order" -> POST
- "search products" -> GET
- "login" -> POST
`,
  templateCode: `/**
 * @param {string} scenario
 * @return {'GET' | 'POST'}
 */
function chooseMethod(scenario) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Read actions usually use GET.",
    "Write/Modify actions usually use POST.",
    "Search is usually GET (query params)."
  ],
  createdAt: '2024-01-29'
};
