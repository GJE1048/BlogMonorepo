import { Problem } from '../../types/problem';

export const babelPrincipleProblem: Problem = {
  id: '108',
  title: 'Simple AST Transformer',
  slug: 'babel-ast-transformer',
  difficulty: 'hard',
  category: 'Engineering',
  tags: ['Babel', 'AST', 'Compiler'],
  description: `
Babel works by parsing code into an AST (Abstract Syntax Tree), transforming the AST, and generating code back.

In this problem, you are given a simplified AST visitor pattern. You need to implement a \`transform\` function that traverses a simplified AST object and applies a visitor to change variable declarations from \`const\` to \`var\`.

Input AST node structure:
\`\`\`js
{
  type: 'Program',
  body: [
    {
      type: 'VariableDeclaration',
      kind: 'const', // Target to change
      declarations: [...]
    },
    ...
  ]
}
\`\`\`

The \`transform\` function should accept the AST and a visitor object. The visitor will have methods matching node types (e.g., \`VariableDeclaration\`).

Note: For this simplified problem, you just need to traverse the \`body\` array of the Program and call the visitor method if it exists.
  `,
  templateCode: `/**
 * @param {object} ast
 * @param {object} visitor
 * @return {object} - The transformed AST
 */
function transform(ast, visitor) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {object} ast
 * @param {object} visitor
 * @return {object} - The transformed AST
 */
function transform(ast, visitor) {
  if (ast.body) {
    ast.body.forEach(node => {
      if (visitor[node.type]) {
        visitor[node.type](node);
      }
    });
  }
  return ast;
}`,
  testCases: [
    {
      input: [
        {
          type: 'Program',
          body: [
            { type: 'VariableDeclaration', kind: 'const', declarations: [] }
          ]
        },
        {
          VariableDeclaration(node: any) {
            if (node.kind === 'const') node.kind = 'var';
          }
        }
      ],
      output: {
        type: 'Program',
        body: [
          { type: 'VariableDeclaration', kind: 'var', declarations: [] }
        ]
      },
    }
  ],
  hints: [
    'Traverse the ast.body array.',
    'For each node, check if the visitor has a method with the same name as node.type.',
    'If yes, call the visitor method with the node.',
  ],
  createdAt: '2024-01-29',
};
