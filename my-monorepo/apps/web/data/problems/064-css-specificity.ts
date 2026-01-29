import type { Problem } from '../../types/problem';

export const cssSpecificityProblem: Problem = {
  id: '064-css-specificity',
  title: 'CSS 选择器优先级 (Specificity)',
  slug: 'css-specificity',
  difficulty: 'easy',
  tags: ['CSS', 'Selector'],
  category: 'CSS',
  description: `
## Description

Calculate the specificity of the following selectors.
Specificity tuple: (Inline, ID, Class/Attribute/Pseudo-class, Element/Pseudo-element).

1. \`#id\`
2. \`.class\`
3. \`div p\`
4. \`div.class #id\`

## Task
Write a function that returns the specificity weight of a given simple selector type (simplified).
Return 100 for ID, 10 for Class, 1 for Element.
`,
  templateCode: `function getSpecificity(selectorType) {
  // selectorType can be 'id', 'class', 'element'
  if (selectorType === 'id') return 100;
  // Complete the function
  
}`,
  testCases: [],
  hints: [
    "ID = 100",
    "Class = 10",
    "Element = 1"
  ],
  createdAt: '2024-01-29'
};
