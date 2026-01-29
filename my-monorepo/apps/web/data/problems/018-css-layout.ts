import type { Problem } from '../../types/problem';

export const cssLayoutProblem: Problem = {
  id: '018-css-layout',
  title: 'CSS 布局题 (CSS Layout)',
  slug: 'css-layout',
  difficulty: 'easy',
  tags: ['Flex', 'Grid', 'CSS'],
  category: 'CSS',
  description: `
## Description

Write the CSS code to center a div of 100x100px inside a container of 500x500px.
The container has class \`.container\` and the item has class \`.item\`.

## Example

\`\`\`css
.container {
  /* Your code here */
}
\`\`\`
`,
  templateCode: `/**
 * Return the CSS string
 * @return {string}
 */
var getCSS = function() {
  return \`
.container {
  width: 500px;
  height: 500px;
  /* Add your layout code here */
}
.item {
  width: 100px;
  height: 100px;
}
  \`;
};`,
  testCases: [
    { input: [], output: 'css-string' } // Simplified validation
  ],
  hints: [
    "Flexbox: display: flex; justify-content: center; align-items: center;",
    "Grid: display: grid; place-items: center;"
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
