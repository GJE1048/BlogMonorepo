import { Problem } from '../../types/problem';

const fn = () => {};

export const tsDecoratorsProblem: Problem = {
  id: '113',
  title: 'TypeScript Readonly Decorator',
  slug: 'ts-decorators',
  difficulty: 'medium',
  category: 'TypeScript',
  tags: ['TypeScript', 'Decorators'],
  description: `
Implement a method decorator \`Readonly\` that makes a method read-only (not writable).

The decorator function receives:
- \`target\`: The prototype of the class
- \`propertyKey\`: The name of the method
- \`descriptor\`: The PropertyDescriptor

You need to return a new descriptor (or modify the existing one) where \`writable\` is set to \`false\`.

Example:
Input descriptor: \`{ value: fn, writable: true }\`
Output descriptor: \`{ value: fn, writable: false }\`
  `,
  templateCode: `/**
 * @param {object} target
 * @param {string} propertyKey
 * @param {object} descriptor
 * @return {object}
 */
function Readonly(target, propertyKey, descriptor) {
  // Your code here
  
}`,
  testCases: [
    {
      input: [{}, 'method', { value: 'fn_placeholder', writable: true }],
      output: { value: 'fn_placeholder', writable: false },
    },
  ],
  hints: [
    'Set descriptor.writable = false',
    'Return the descriptor',
  ],
  createdAt: '2024-01-29',
};
