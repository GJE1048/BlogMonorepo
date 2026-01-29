import type { Problem } from '../../types/problem';

export const eventDelegationProblem: Problem = {
  id: '019-event-delegation',
  title: '事件委托 (Event Delegation)',
  slug: 'event-delegation',
  difficulty: 'easy',
  tags: ['Event', 'Performance', 'DOM'],
  category: 'DOM',
  description: `
## Description

Implement a function \`delegate(element, eventType, selector, handler)\`.
It attaches an event listener to \`element\` that triggers \`handler\` only when the event target matches \`selector\`.

## Example

\`\`\`javascript
const list = document.querySelector('#list');
delegate(list, 'click', 'li', (e) => console.log(e.target));
\`\`\`
`,
  templateCode: `/**
 * @param {HTMLElement} element
 * @param {string} eventType
 * @param {string} selector
 * @param {Function} handler
 */
var delegate = function(element, eventType, selector, handler) {
  
};`,
  testCases: [
    { input: [], output: 'delegated' } // Simplified
  ],
  hints: [
    "Use element.addEventListener.",
    "In the callback, check if event.target.matches(selector)."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
