import type { Problem } from '../../types/problem';

export const vueVirtualDomProblem: Problem = {
  id: '057-vue-virtual-dom',
  title: 'Vue 虚拟 DOM (Vue Virtual DOM)',
  slug: 'vue-virtual-dom',
  difficulty: 'medium',
  tags: ['Vue', 'VNode'],
  category: 'Vue',
  description: `
## Description

Create a simple \`h\` function (hyperscript) to create VNodes.
VNode structure: \`{ tag, props, children }\`.

## Example

\`\`\`javascript
const vnode = h('div', { id: 'app' }, [
  h('p', null, 'Hello')
]);
// { tag: 'div', props: { id: 'app' }, children: [...] }
\`\`\`
`,
  templateCode: `/**
 * @param {string} tag
 * @param {object} props
 * @param {string|array} children
 * @return {object}
 */
function h(tag, props, children) {
  // Your code here
  
}`,
  testCases: [
    { 
      input: ['div', { id: 'app' }, 'text'], 
      output: { tag: 'div', props: { id: 'app' }, children: 'text' } 
    }
  ],
  hints: [
    "Just return the object structure.",
    "Normalize children if needed."
  ],
  createdAt: '2024-01-29'
};
