import type { Problem } from '../../types/problem';

export const boxModelProblem: Problem = {
  id: '061-box-model',
  title: '盒模型 (Box Model)',
  slug: 'box-model',
  difficulty: 'easy',
  tags: ['CSS', 'Box Model'],
  category: 'CSS',
  description: `
## Description

Explain the Standard Box Model vs. IE Box Model.
How do you switch between them?

Write CSS to set a global box-sizing rule.

## Content

1. **content-box** (Standard): width = content
2. **border-box** (IE/Alternative): width = content + padding + border

## Task
Set all elements to use \`border-box\`.
`,
  templateCode: `/* Add CSS to set border-box globally */
*, *::before, *::after {
  /* Your code here */
  
}`,
  solutionCode: `/* Add CSS to set border-box globally */
*, *::before, *::after {
  box-sizing: border-box;
}`,
  testCases: [],
  hints: [
    "box-sizing: border-box;"
  ],
  createdAt: '2024-01-29'
};
