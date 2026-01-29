import type { Problem } from '../../types/problem';

export const vueComponentCommProblem: Problem = {
  id: '055-vue-component-communication',
  title: 'Vue 组件通信 (Vue Component Communication)',
  slug: 'vue-component-communication',
  difficulty: 'medium',
  tags: ['Vue', 'Props', 'Emit'],
  category: 'Vue',
  description: `
## Description

Demonstrate Parent-Child communication in Vue 3.
1. Parent passes data to Child via \`props\`.
2. Child sends data back to Parent via \`emit\`.

## Example

\`\`\`javascript
// Child
props: ['msg'],
emits: ['update'],
setup(props, { emit }) {
  emit('update', 'newValue');
}
\`\`\`
`,
  templateCode: `// Parent Component
import { ref } from 'vue';
import Child from './Child.vue';

export default {
  components: { Child },
  setup() {
    const parentMsg = ref('Hello');
    const handleUpdate = (val) => {
      parentMsg.value = val;
    };
    return { parentMsg, handleUpdate };
  }
}

// Child Component definition (simulate)
const Child = {
  props: ['msg'],
  emits: ['update'],
  setup(props, { emit }) {
    // Call emit here when needed
  },
  template: \`<button @click="$emit('update', 'World')">Update</button>\`
};`,
  testCases: [],
  hints: [
    "Props are read-only.",
    "Use emit to trigger events."
  ],
  createdAt: '2024-01-29'
};
