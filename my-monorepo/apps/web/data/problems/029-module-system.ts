import type { Problem } from '../../types/problem';

export const moduleSystemProblem: Problem = {
  id: '029-module-system',
  title: '模块化方案对比 (Module Systems)',
  slug: 'module-systems',
  difficulty: 'medium',
  tags: ['JavaScript', 'Modules', 'CommonJS'],
  category: 'JavaScript',
  description: `
## Description

Simulate a simple CommonJS \`require\` function.
Assume we have a map of modules where keys are paths and values are module factory functions.

## Example

\`\`\`javascript
const modules = {
  './add.js': function(module, exports, require) {
    exports.add = (a, b) => a + b;
  },
  './index.js': function(module, exports, require) {
    const { add } = require('./add.js');
    console.log(add(1, 2));
  }
};

require('./index.js'); // Output: 3
\`\`\`
`,
  templateCode: `const modules = {
  // Define your modules here for testing
};

function require(path) {
  // Your implementation
  
}`,
  testCases: [
    { input: [], output: 3 }
  ],
  hints: [
    "Create a module object: { exports: {} }.",
    "Call the factory function with module, module.exports, and require.",
    "Return module.exports.",
    "Implement caching if you want extra credit."
  ],
  createdAt: '2024-01-29'
};
