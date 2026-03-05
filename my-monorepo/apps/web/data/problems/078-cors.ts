import type { Problem } from '../../types/problem';

export const corsProblem: Problem = {
  id: '078-cors',
  title: '跨域解决方案 (CORS)',
  slug: 'cors',
  difficulty: 'medium',
  tags: ['Network', 'Security'],
  category: 'Browser',
  description: `
## Description

**CORS** (Cross-Origin Resource Sharing) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.

## Solutions
1. **CORS Headers** (Server-side): \`Access-Control-Allow-Origin\`.
2. **JSONP** (Legacy, GET only).
3. **Proxy** (Dev server / Nginx).

## Task
Implement a simple JSONP function.
`,
  templateCode: `function jsonp(url, callbackName) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    
    // Set src with callback param
    
    // Append to body
    
    // Cleanup on load/error
  });
}`,
  testCases: [],
  hints: [
    "url += '?callback=' + callbackName",
    "window[callbackName] = (data) => { ... }"
  ],
  createdAt: '2024-01-29'
};
