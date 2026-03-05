import type { Problem } from '../../types/problem';

export const codeSplittingProblem: Problem = {
  id: '094-code-splitting',
  title: 'Code Splitting',
  slug: 'code-splitting',
  difficulty: 'medium',
  tags: ['Performance', 'Bundling'],
  category: 'Performance',
  description: `
## Description

Explain Code Splitting.
- Route-based splitting.
- Component-based splitting.
- Dynamic imports (\`import()\`).

## Task
Simulate a dynamic import function that returns a Promise resolving to a module.
If the module name is 'error', reject.
`,
  templateCode: `/**
 * @param {string} moduleName
 * @return {Promise<Object>}
 */
function dynamicImport(moduleName) {
  // Simulate network delay and return mock module
  
}`,
  testCases: [],
  hints: [
    "Use setTimeout.",
    "Return Promise.",
    "Resolve with { default: ... }"
  ],
  createdAt: '2024-01-29'
};
