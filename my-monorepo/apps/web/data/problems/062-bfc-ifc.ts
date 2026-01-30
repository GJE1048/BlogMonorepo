import type { Problem } from '../../types/problem';

export const bfcProblem: Problem = {
  id: '062-bfc-ifc',
  title: 'BFC / IFC',
  slug: 'bfc-ifc',
  difficulty: 'medium',
  tags: ['CSS', 'Layout'],
  category: 'CSS',
  description: `
## Description

What is **BFC** (Block Formatting Context)?
List ways to trigger a BFC.
Common uses of BFC:
1. Prevent margin collapsing.
2. Clear floats.
3. Prevent element from being overlapped by floats.

## Task
Write CSS to create a BFC on the \`.container\` element without changing its visibility or position significantly.
`,
  templateCode: `.container {
  /* Add property to trigger BFC */
  
}`,
  solutionCode: `.container {
  /* Add property to trigger BFC */
  overflow: hidden; 
  /* Or use display: flow-root; */
  /* Or use display: flex; */
}`,
  testCases: [],
  hints: [
    "overflow: hidden",
    "display: flow-root",
    "display: flex"
  ],
  createdAt: '2024-01-29'
};
