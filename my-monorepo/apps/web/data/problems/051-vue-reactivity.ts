import type { Problem } from '../../types/problem';

export const vueReactivityProblem: Problem = {
  id: '051-vue-reactivity',
  title: 'Vue 响应式原理 (Vue Reactivity)',
  slug: 'vue-reactivity',
  difficulty: 'hard',
  tags: ['Vue', 'Proxy', 'Reactivity'],
  category: 'Vue',
  description: `
## Description

Implement a basic Vue 3 reactivity system using \`Proxy\`.
1. \`reactive(obj)\`: Returns a reactive proxy.
2. \`effect(fn)\`: Runs the function and re-runs it when dependencies change.
3. \`track(target, key)\` and \`trigger(target, key)\`.

## Example

\`\`\`javascript
const state = reactive({ count: 0 });
let double;

effect(() => {
  double = state.count * 2;
});

console.log(double); // 0
state.count++;
console.log(double); // 2
\`\`\`
`,
  templateCode: `const targetMap = new WeakMap();
let activeEffect = null;

function track(target, key) {
  // Your code here
}

function trigger(target, key) {
  // Your code here
}

function reactive(target) {
  // Your code here
}

function effect(fn) {
  // Your code here
}`,
  solutionCode: `const targetMap = new WeakMap();
let activeEffect = null;

function track(target, key) {
  if (!activeEffect) return;
  
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  dep.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    }
  });
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}`,
  testCases: [],
  hints: [
    "Use a global 'activeEffect' to store the current running effect.",
    "In 'get' trap, call track().",
    "In 'set' trap, call trigger()."
  ],
  createdAt: '2024-01-29'
};
