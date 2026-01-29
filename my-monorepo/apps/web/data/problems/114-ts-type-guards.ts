import { Problem } from '../../types/problem';

export const tsTypeGuardsProblem: Problem = {
  id: '114',
  title: 'Custom Type Guard',
  slug: 'ts-type-guards',
  difficulty: 'medium',
  category: 'TypeScript',
  tags: ['TypeScript', 'Type Guard'],
  description: `
Implement a custom type guard function \`isUser\` that checks if a given unknown value is a \`User\` object.

Interface \`User\`:
- \`name\`: string
- \`age\`: number

The function should return \`true\` if the value matches the structure, \`false\` otherwise.

Function signature in TS:
\`function isUser(value: unknown): value is User\`
  `,
  templateCode: `/**
 * @param {unknown} value
 * @return {boolean}
 */
function isUser(value) {
  // Your code here
  
}`,
  testCases: [
    {
      input: [{ name: 'Alice', age: 30 }],
      output: true,
    },
    {
      input: [{ name: 'Bob' }], // Missing age
      output: false,
    },
    {
      input: [null],
      output: false,
    },
    {
      input: [{ name: 123, age: 30 }], // name not string
      output: false,
    },
  ],
  hints: [
    'Check if value is an object and not null.',
    'Check if "name" in value and typeof value.name is string.',
    'Check if "age" in value and typeof value.age is number.',
  ],
  createdAt: '2024-01-29',
};
