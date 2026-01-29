import type { Problem } from '../../types/problem';

export const implementHooksProblem: Problem = {
  id: '015-implement-hooks',
  title: '实现 React Hooks (Implement React Hooks)',
  slug: 'implement-hooks',
  difficulty: 'hard',
  tags: ['Hooks', 'Closure', 'React'],
  category: 'React',
  description: `
## Description

Implement a simplified version of \`useState\`.
It should return a state value and a function to update it.
The component function will be called repeatedly to simulate re-renders.

## Example

\`\`\`javascript
const [count, setCount] = useState(0);
setCount(1);
// next render, count should be 1
\`\`\`
`,
  templateCode: `
let state; // You might need a global store or module-level variable to simulate persistence

function useState(initialValue) {
  
}
`,
  testCases: [
    { input: [], output: 'simulated' }
  ],
  hints: [
    "Use a module-level variable to store the state.",
    "Closures are key here."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
