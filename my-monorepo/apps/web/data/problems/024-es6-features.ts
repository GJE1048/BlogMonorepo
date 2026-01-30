import type { Problem } from '../../types/problem';

export const es6FeaturesProblem: Problem = {
  id: '024-es6-features',
  title: 'ES6+ 新特性 (ES6+ Features)',
  slug: 'es6-features',
  difficulty: 'easy',
  tags: ['JavaScript', 'ES6'],
  category: 'JavaScript',
  description: `
## Description

Refactor the following code to use ES6 features:
1. \`let\` or \`const\` instead of \`var\`.
2. Arrow functions.
3. Template literals.
4. Object destructuring.

## Original Code

\`\`\`javascript
var person = { name: 'John', age: 30 };
var getInfo = function(p) {
  var name = p.name;
  var age = p.age;
  return 'Name: ' + name + ', Age: ' + age;
};
\`\`\`
`,
  templateCode: `const person = { name: 'John', age: 30 };

const getInfo = (p) => {
  // Refactor this function
  var name = p.name;
  var age = p.age;
  return 'Name: ' + name + ', Age: ' + age;
};`,
  solutionCode: `const person = { name: 'John', age: 30 };
const getInfo = (p) => {
  const { name, age } = p;
  return \`Name: \${name}, Age: \${age}\`;
};`,
  testCases: [
    { input: [], output: 'string' }
  ],
  hints: [
    "Use const { name, age } = p;",
    "Use \`Name: \${name}, Age: \${age}\`"
  ],
  createdAt: '2024-01-29'
};
