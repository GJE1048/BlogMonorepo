import { Problem } from '../../types/problem';

export const tsBasicsProblem: Problem = {
  id: '111',
  title: 'TypeScript Interface Definition',
  slug: 'ts-interface',
  difficulty: 'easy',
  category: 'TypeScript',
  tags: ['TypeScript', 'Interface'],
  description: `
Define an interface \`User\` that matches the following object structure:
- \`id\`: number (readonly)
- \`name\`: string
- \`age\`: number (optional)
- \`email\`: string

And a function \`getUserInfo\` that accepts a User object and returns a string "User <name> is <age> years old" (or "User <name>" if age is missing).

Note: Since this is a runtime execution environment, we check the behavior of the function, but the goal is to write correct TS code.
  `,
  templateCode: `interface User {
  // Define interface here
}

/**
 * @param {User} user
 * @return {string}
 */
function getUserInfo(user) {
  // Your code here
  
}`,
  testCases: [
    {
      input: [{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' }],
      output: 'User Alice is 25 years old',
    },
    {
      input: [{ id: 2, name: 'Bob', email: 'bob@example.com' }],
      output: 'User Bob',
    },
  ],
  hints: [
    'Use `readonly` for id.',
    'Use `?` for optional properties.',
  ],
  createdAt: '2024-01-29',
};
