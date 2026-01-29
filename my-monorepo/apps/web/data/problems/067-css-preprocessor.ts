import type { Problem } from '../../types/problem';

export const cssPreprocessorProblem: Problem = {
  id: '067-css-preprocessor',
  title: 'CSS 预处理器 (Sass/Less)',
  slug: 'css-preprocessor',
  difficulty: 'easy',
  tags: ['CSS', 'Sass'],
  category: 'CSS',
  description: `
## Description

Demonstrate **Nesting** and **Variables** in SCSS.
Define a variable \`$primary-color: blue;\`.
Nest a \`.child\` selector inside \`.parent\`.

`,
  templateCode: `/* SCSS Syntax */
$primary-color: blue;

.parent {
  color: $primary-color;
  
  /* Nest .child here */
  .child {
    
  }
}`,
  testCases: [],
  hints: [
    ".child { font-weight: bold; }"
  ],
  createdAt: '2024-01-29'
};
