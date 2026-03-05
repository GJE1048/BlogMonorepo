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
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`
`,
  templateCode: `import React from 'react';

export default function App() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">CSS Center Layout</h2>
      
      <div className="container">
        <div className="item">Center Me</div>
      </div>

      <style>{\`
        .container {
          width: 300px;
          height: 300px;
          background: #1f2937;
          border-radius: 8px;
          /* Add your layout code here */
          
        }
        
        .item {
          width: 100px;
          height: 100px;
          background: #3b82f6;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
      \`}</style>
    </div>
  );
}`,
  solutionCode: `import React from 'react';

export default function App() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">CSS Center Layout</h2>
      
      <div className="container">
        <div className="item">Center Me</div>
      </div>

      <style>{\`
        .container {
          width: 300px;
          height: 300px;
          background: #1f2937;
          border-radius: 8px;
          /* Add your layout code here */
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .item {
          width: 100px;
          height: 100px;
          background: #3b82f6;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
      \`}</style>
    </div>
  );
}`,
  testCases: [
    { input: [], output: 'css-string' } // Visual verification mostly
  ],
  hints: [
    "Flexbox: display: flex; justify-content: center; align-items: center;",
    "Grid: display: grid; place-items: center;"
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
