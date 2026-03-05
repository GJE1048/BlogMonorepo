import type { Problem } from '../../types/problem';

export const routerImplementationProblem: Problem = {
  id: '017-router-implementation',
  title: '路由实现 (Router Implementation)',
  slug: 'router-implementation',
  difficulty: 'medium',
  tags: ['Router', 'History', 'Framework'],
  category: 'Framework',
  description: `
## Description

Implement a simple client-side router class.
It should support \`route(path, callback)\` to register routes and handle URL changes (hash based or history API).
For this problem, let's assume hash based routing.

## Example

\`\`\`javascript
const router = new Router();
router.route('/home', () => console.log('home'));
router.push('/home'); // triggers callback
\`\`\`
`,
  templateCode: `class Router {
  constructor() {
    
  }

  route(path, callback) {
    
  }

  push(path) {
    
  }
}`,
  solutionCode: `class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('hashchange', this.refresh.bind(this));
    window.addEventListener('load', this.refresh.bind(this));
  }

  route(path, callback) {
    this.routes[path] = callback;
  }

  push(path) {
    location.hash = path;
  }
  
  refresh() {
    const currentUrl = location.hash.slice(1) || '/';
    if (this.routes[currentUrl]) {
      this.routes[currentUrl]();
    }
  }
}`,
  testCases: [
    { input: ['/home'], output: 'home' } // Simplified
  ],
  hints: [
    "Listen to hashchange event.",
    "Store routes in a map."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
