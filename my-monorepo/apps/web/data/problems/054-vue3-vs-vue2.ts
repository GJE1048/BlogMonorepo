import type { Problem } from '../../types/problem';

export const vue3vs2Problem: Problem = {
  id: '054-vue3-vs-vue2',
  title: 'Vue 3 vs Vue 2 区别',
  slug: 'vue3-vs-vue2',
  difficulty: 'medium',
  tags: ['Vue', 'Composition API'],
  category: 'Vue',
  description: `
## Description

Rewrite a Vue 2 Options API component into Vue 3 Composition API.

## Vue 2 Code

\`\`\`javascript
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  computed: {
    double() {
      return this.count * 2;
    }
  }
}
\`\`\`
`,
  templateCode: `import { ref, computed } from 'vue';

export default {
  setup() {
    // Rewrite using Composition API
    
    return {};
  }
}`,
  solutionCode: `import { ref, computed } from 'vue';

export default {
  setup() {
    // Rewrite using Composition API
    const count = ref(0);
    
    const increment = () => {
      count.value++;
    };
    
    const double = computed(() => {
      return count.value * 2;
    });
    
    return { count, increment, double };
  }
}`,
  testCases: [],
  hints: [
    "Use ref for reactive data.",
    "Define functions for methods.",
    "Use computed() for computed properties.",
    "Return everything needed in the template."
  ],
  createdAt: '2024-01-29'
};
