import type { Problem } from '../../types/problem';

export const reflowOptimizationProblem: Problem = {
  id: '073-reflow-optimization',
  title: '回流与重绘优化 (Optimization)',
  slug: 'reflow-optimization',
  difficulty: 'medium',
  tags: ['Browser', 'Performance'],
  category: 'Browser',
  description: `
## Description

How to minimize Reflows?
1. Batch DOM changes.
2. Use \`class\` change instead of multiple style changes.
3. Use \`documentFragment\`.
4. Read layout properties once (cache them) to avoid layout thrashing.
5. Use \`transform\` and \`opacity\` for animations (GPU).

## Task
Optimize the following loop that causes Layout Thrashing.

\`\`\`javascript
for (let i = 0; i < 100; i++) {
  div.style.width = div.offsetWidth + 1 + 'px';
}
\`\`\`
`,
  templateCode: `function optimizedResize(div) {
  // Read once
  let width = div.offsetWidth;
  
  // Write in batch (or just calculate final value)
  
}`,
  testCases: [],
  hints: [
    "Separate read and write phases."
  ],
  createdAt: '2024-01-29'
};
