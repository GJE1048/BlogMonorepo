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
  solutionCode: `// Parent Component
import { ref } from 'vue';

// Simulate importing Child
// import Child from './Child.vue';

export default {
  // components: { Child },
  setup() {
    const parentMsg = ref('Hello');
    const handleUpdate = (val) => {
      console.log('Parent received:', val);
      parentMsg.value = val;
    };
    return { parentMsg, handleUpdate };
  },
  template: \`
    <div>
      <h1>Parent: {{ parentMsg }}</h1>
      <Child :msg="parentMsg" @update="handleUpdate" />
    </div>
  \`
}

// Child Component definition (simulate)
const Child = {
  props: ['msg'],
  emits: ['update'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('update', 'World ' + Math.random().toFixed(2));
    };
    return { handleClick };
  },
  template: \`<button @click="handleClick">Update Parent</button>\`
};`,
  testCases: [],
  hints: [
    "Props are read-only.",
    "Use emit to trigger events."
  ],
  createdAt: '2024-01-29'
};
