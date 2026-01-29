import type { Problem } from '../../types/problem';

export const vuexPiniaProblem: Problem = {
  id: '056-vuex-pinia',
  title: 'Vuex/Pinia 原理',
  slug: 'vuex-pinia',
  difficulty: 'medium',
  tags: ['Vue', 'State Management'],
  category: 'Vue',
  description: `
## Description

Implement a simplified version of Pinia (State Management).
Create a function \`defineStore(id, setup)\` that returns a \`useStore\` hook.
The store should hold reactive state.

## Example

\`\`\`javascript
const useCounter = defineStore('counter', () => {
  const count = ref(0);
  function increment() { count.value++ }
  return { count, increment };
});

const store = useCounter();
store.increment();
\`\`\`
`,
  templateCode: `import { ref, reactive, effectScope } from 'vue';

const stores = new Map();

function defineStore(id, setup) {
  // Your implementation
  
}

// Usage for testing
// const useStore = defineStore('main', () => { ... });`,
  testCases: [],
  hints: [
    "Use a singleton map to store state instances.",
    "If store exists, return it; otherwise create it using the setup function.",
    "Use effectScope() to manage subscriptions (optional for simple version)."
  ],
  createdAt: '2024-01-29'
};
