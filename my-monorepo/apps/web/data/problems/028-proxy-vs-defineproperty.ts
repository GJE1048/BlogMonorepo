import type { Problem } from '../../types/problem';

export const proxyProblem: Problem = {
  id: '028-proxy-vs-defineproperty',
  title: 'Proxy vs Object.defineProperty',
  slug: 'proxy-vs-defineproperty',
  difficulty: 'medium',
  tags: ['JavaScript', 'Proxy', 'Reactivity'],
  category: 'JavaScript',
  description: `
## Description

Create a simple reactive observer using \`Proxy\`.
When a property is accessed, log 'get key'.
When a property is set, log 'set key to value'.

## Example

\`\`\`javascript
const target = { name: 'Vue' };
const observed = createObserver(target);

observed.name = 'React'; // logs: set name to React
console.log(observed.name); // logs: get name
\`\`\`
`,
  templateCode: `function createObserver(target) {
  // Your code here
  
}`,
  testCases: [
    { input: [], output: 'observed-object' }
  ],
  hints: [
    "Use new Proxy(target, handler).",
    "Implement get and set traps in the handler."
  ],
  createdAt: '2024-01-29'
};
