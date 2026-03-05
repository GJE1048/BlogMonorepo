import type { Problem } from '../../types/problem';

export const semanticHtmlProblem: Problem = {
  id: '069-semantic-html',
  title: '语义化标签 (Semantic HTML)',
  slug: 'semantic-html',
  difficulty: 'easy',
  tags: ['HTML', 'SEO'],
  category: 'HTML',
  description: `
## Description

Why is Semantic HTML important?
1. SEO friendly.
2. Accessibility (Screen readers).
3. Code readability.

## Task
Replace the \`div\` soup below with semantic tags.

\`\`\`html
<div class="header">Header</div>
<div class="nav">Menu</div>
<div class="article">Content</div>
<div class="footer">Footer</div>
\`\`\`
`,
  templateCode: `<!-- Replace with semantic tags -->
<header>Header</header>
<nav>Menu</nav>
<article>Content</article>
<footer>Footer</footer>`,
  testCases: [],
  hints: [
    "Use <header>, <nav>, <article>, <footer>."
  ],
  createdAt: '2024-01-29'
};
