import type { Problem } from '../../types/problem';

export const securityProblem: Problem = {
  id: '079-security',
  title: '安全问题 (XSS / CSRF)',
  slug: 'security',
  difficulty: 'medium',
  tags: ['Security'],
  category: 'Browser',
  description: `
## Description

**XSS (Cross-Site Scripting)**: Injecting malicious scripts.
- Prevention: Escape input, Content Security Policy (CSP), HttpOnly cookies.

**CSRF (Cross-Site Request Forgery)**: Unauthorized commands from a trusted user.
- Prevention: CSRF Tokens, SameSite cookies.

## Task
Write a function to sanitize HTML string to prevent basic XSS.
`,
  templateCode: `function sanitize(str) {
  // Replace <, >, &, ", ' with entities
  return str.replace(/[&<>"']/g, (match) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return map[match];
  });
}`,
  testCases: [
    { input: ['<script>alert(1)</script>'], output: '&lt;script&gt;alert(1)&lt;/script&gt;' }
  ],
  hints: [
    "Use regex replace."
  ],
  createdAt: '2024-01-29'
};
