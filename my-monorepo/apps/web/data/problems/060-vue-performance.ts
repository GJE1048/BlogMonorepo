import type { Problem } from '../../types/problem';

export const vuePerformanceProblem: Problem = {
  id: '060-vue-performance',
  title: 'Vue 性能优化 (Vue Performance)',
  slug: 'vue-performance',
  difficulty: 'medium',
  tags: ['Vue', 'Performance'],
  category: 'Vue',
  description: `
## Description

List and demonstrate common Vue performance optimization techniques.
1. \`v-if\` vs \`v-show\`.
2. \`v-for\` with \`key\`.
3. Functional components (in Vue 2) or Stateless components.
4. \`shallowRef\` vs \`ref\`.

## Task
Implement a scenario where \`shallowRef\` is preferred over \`ref\` for a large immutable dataset.

## Example

\`\`\`javascript
const data = shallowRef(largeArray);
// modifying data.value will trigger update
// modifying data.value[0] will NOT
\`\`\`
`,
  templateCode: `import { shallowRef, triggerRef } from 'vue';

export default {
  setup() {
    // Use shallowRef for a large object
    const largeData = shallowRef({});
    
    function updateWholeData(newData) {
      // This should trigger
      
    }
    
    function updateProperty() {
      // This should NOT trigger automatically unless triggerRef is used
      
    }

    return { largeData, updateWholeData, updateProperty };
  }
}`,
  solutionCode: `import { shallowRef, triggerRef } from 'vue';

export default {
  setup() {
    // Use shallowRef for a large object
    const largeData = shallowRef({ list: [] });
    
    // Simulate initial data load
    largeData.value = { list: Array(1000).fill(0).map((_, i) => i) };

    function updateWholeData(newData) {
      // This should trigger
      largeData.value = newData;
    }
    
    function updateProperty() {
      // This should NOT trigger automatically unless triggerRef is used
      largeData.value.list[0] = 999;
      // Manually trigger
      triggerRef(largeData);
    }

    return { largeData, updateWholeData, updateProperty };
  }
}`,
  testCases: [],
  hints: [
    "shallowRef only tracks .value changes.",
    "Good for large data structures that are replaced entirely."
  ],
  createdAt: '2024-01-29'
};
