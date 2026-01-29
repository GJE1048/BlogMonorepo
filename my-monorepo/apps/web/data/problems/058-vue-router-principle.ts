import type { Problem } from '../../types/problem';

export const vueRouterProblem: Problem = {
  id: '058-vue-router-principle',
  title: 'Vue Router 原理 (Vue Router Principle)',
  slug: 'vue-router-principle',
  difficulty: 'medium',
  tags: ['Vue', 'Router'],
  category: 'Vue',
  description: `
## Description

Implement a simple Vue Router using \`hash\` mode.
It should expose \`createRouter\` and \`install\` method (Vue plugin).
Provide a \`RouterView\` component that renders the current route component.

## Example

\`\`\`javascript
const router = createRouter({
  routes: [{ path: '/', component: Home }]
});
app.use(router);
\`\`\`
`,
  templateCode: `import { ref, computed } from 'vue';

function createRouter(options) {
  // 1. Define reactive current path
  
  // 2. Listen to hashchange
  
  // 3. Return router object with install method
  return {
    install(app) {
      // Register global components or provide router
    }
  };
}`,
  testCases: [],
  hints: [
    "Use ref() to store currentHash.",
    "app.component('RouterView', ...)",
    "Match routes based on currentHash."
  ],
  createdAt: '2024-01-29'
};
