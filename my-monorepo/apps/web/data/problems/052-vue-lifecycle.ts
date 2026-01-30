import type { Problem } from '../../types/problem';

export const vueLifecycleProblem: Problem = {
  id: '052-vue-lifecycle',
  title: 'Vue 生命周期 (Vue Lifecycle)',
  slug: 'vue-lifecycle',
  difficulty: 'easy',
  tags: ['Vue', 'Lifecycle'],
  category: 'Vue',
  description: `
## Description

Explain the Vue 3 lifecycle hooks.
Create a Vue 3 component (using Composition API) that logs messages in:
- \`onMounted\`
- \`onUpdated\`
- \`onUnmounted\`

## Example

\`\`\`javascript
// Vue 3 Composition API
import { onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    onMounted(() => console.log('mounted'));
    onUnmounted(() => console.log('unmounted'));
  }
}
\`\`\`
`,
  templateCode: `// This is a conceptual problem. 
// Write the setup function code below.

import { onMounted, onUpdated, onUnmounted, ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    
    // Implement hooks here

    return { count };
  }
}`,
  solutionCode: `import { onMounted, onUpdated, onUnmounted, ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    
    // Implement hooks here
    onMounted(() => {
      console.log('Component Mounted');
    });

    onUpdated(() => {
      console.log('Component Updated (count: ' + count.value + ')');
    });

    onUnmounted(() => {
      console.log('Component Unmounted');
    });

    return { count };
  }
}`,
  testCases: [],
  hints: [
    "Import hooks from 'vue'.",
    "Call them inside setup()."
  ],
  createdAt: '2024-01-29'
};
