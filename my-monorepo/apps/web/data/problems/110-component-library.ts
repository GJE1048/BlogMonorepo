import { Problem } from '../../types/problem';

export const componentLibraryProblem: Problem = {
  id: '110',
  title: 'Simple Component Library',
  slug: 'simple-component-library',
  difficulty: 'medium',
  category: 'Engineering',
  tags: ['Component Library', 'Design System'],
  description: `
Implement a simple \`Button\` component generator function that returns an HTML string based on props.
This simulates a framework-agnostic component library approach or a server-side rendered component.

The \`renderButton\` function accepts:
- \`type\`: 'primary' | 'secondary' | 'text' (default 'primary')
- \`size\`: 'small' | 'medium' | 'large' (default 'medium')
- \`children\`: string content

Output HTML should have classes: \`btn btn-<type> btn-<size>\`.

Example:
Input: \`{ type: 'secondary', children: 'Click' }\`
Output: \`<button class="btn btn-secondary btn-medium">Click</button>\`
  `,
  templateCode: `/**
 * @param {object} props
 * @param {string} [props.type='primary']
 * @param {string} [props.size='medium']
 * @param {string} props.children
 * @return {string}
 */
function renderButton(props) {
  // Your code here
  
}`,
  testCases: [
    {
      input: [{ children: 'Submit' }],
      output: '<button class="btn btn-primary btn-medium">Submit</button>',
    },
    {
      input: [{ type: 'text', size: 'small', children: 'Cancel' }],
      output: '<button class="btn btn-text btn-small">Cancel</button>',
    },
  ],
  hints: [
    'Use default parameter values or Object.assign/destructuring with defaults.',
    'Use template literals to construct the HTML string.',
  ],
  createdAt: '2024-01-29',
};
