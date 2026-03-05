import type { Problem } from '../../types/problem';

export const vueComputedWatchProblem: Problem = {
  id: '053-vue-computed-watch',
  title: 'computed vs watch',
  slug: 'vue-computed-watch',
  difficulty: 'easy',
  tags: ['Vue', 'Computed', 'Watch'],
  category: 'Vue',
  description: `
## Description

Implement a Vue 3 component that demonstrates the difference between \`computed\` and \`watch\`.
1. Use \`computed\` to derive a value (e.g., fullName = firstName + lastName).
2. Use \`watch\` to perform a side effect (e.g., log to console) when a value changes.

## Example

\`\`\`javascript
const fullName = computed(() => firstName.value + ' ' + lastName.value);

watch(firstName, (newVal) => {
  console.log('Name changed to: ' + newVal);
});
\`\`\`
`,
  templateCode: `import { ref, computed, watch } from 'vue';

export default {
  setup() {
    const firstName = ref('John');
    const lastName = ref('Doe');

    // Implement computed fullName
    
    // Implement watch for firstName
    
    return { firstName, lastName };
  }
}`,
  solutionCode: `import { ref, computed, watch } from 'vue';

export default {
  setup() {
    const firstName = ref('John');
    const lastName = ref('Doe');

    // Implement computed fullName
    const fullName = computed(() => {
      return firstName.value + ' ' + lastName.value;
    });
    
    // Implement watch for firstName
    watch(firstName, (newVal, oldVal) => {
      console.log(\`First name changed from \${oldVal} to \${newVal}\`);
    });

    return { firstName, lastName, fullName };
  }
}`,
  testCases: [],
  hints: [
    "Computed returns a ref.",
    "Watch takes a source and a callback."
  ],
  createdAt: '2024-01-29'
};
