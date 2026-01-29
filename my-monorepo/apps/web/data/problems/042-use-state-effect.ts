import type { Problem } from '../../types/problem';

export const useStateEffectProblem: Problem = {
  id: '042-use-state-effect',
  title: 'useState/useEffect 原理 (useState/useEffect Principle)',
  slug: 'use-state-effect',
  difficulty: 'medium',
  tags: ['React', 'Hooks'],
  category: 'React',
  description: `
## Description

Implement a simplified version of \`useState\` and \`useEffect\`.
We will simulate a simple React module pattern.

Requirements:
1. \`useState(initialValue)\` returns \`[state, setState]\`.
2. \`useEffect(callback, deps)\` executes callback if deps change.
3. Support multiple hooks in a single component (using index tracking).

## Example

\`\`\`javascript
const React = (function() {
  let hooks = [];
  let idx = 0;
  
  function useState(initVal) {
    // Implement this
  }
  
  function useEffect(cb, depArray) {
    // Implement this
  }
  
  function render(Component) {
    idx = 0;
    const C = Component();
    C.render();
    return C;
  }
  
  return { useState, useEffect, render };
})();
\`\`\`
`,
  templateCode: `const MyReact = (function() {
  let hooks = [];
  let idx = 0;

  function useState(initVal) {
    // Implement simplified useState
    
  }

  function useEffect(cb, depArray) {
    // Implement simplified useEffect
    
  }

  function render(Component) {
    idx = 0;
    const C = Component();
    C.render();
    return C;
  }

  return { useState, useEffect, render };
})();`,
  testCases: [],
  hints: [
    "Store state in the `hooks` array at the current `idx`.",
    "Increment `idx` after each hook call.",
    "For useEffect, compare current deps with old deps stored in `hooks[idx]`."
  ],
  createdAt: '2024-01-29'
};
