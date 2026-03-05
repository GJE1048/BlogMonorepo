import type { Problem } from '../../types/problem';

export const thisBindingProblem: Problem = {
  id: '030-this-binding',
  title: 'this 指向问题 (this Binding)',
  slug: 'this-binding',
  difficulty: 'easy',
  tags: ['JavaScript', 'this', 'call', 'apply', 'bind'],
  category: 'JavaScript',
  description: `
## Description

Fix the following code so that \`greet\` correctly logs "Hello, Alice".
You must use \`bind\`, \`call\`, or \`apply\`.

## Code

\`\`\`javascript
const person = {
  name: 'Alice',
  greet: function() {
    return 'Hello, ' + this.name;
  }
};

const greet = person.greet;
console.log(greet()); // 'Hello, undefined'
\`\`\`
`,
  templateCode: `const person = {
  name: 'Alice',
  greet: function() {
    return 'Hello, ' + this.name;
  }
};

const greet = person.greet;

function fixedGreet() {
  // Return the result of calling greet with correct context
  
}`,
  solutionCode: `const person = {
  name: 'Alice',
  greet: function() {
    return 'Hello, ' + this.name;
  }
};

const greet = person.greet;

function fixedGreet() {
  return greet.call(person);
}`,
  testCases: [
    { input: [], output: 'Hello, Alice' }
  ],
  hints: [
    "greet.call(person)",
    "greet.apply(person)",
    "person.greet.bind(person)()"
  ],
  createdAt: '2024-01-29'
};
