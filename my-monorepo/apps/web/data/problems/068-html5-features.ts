import type { Problem } from '../../types/problem';

export const html5FeaturesProblem: Problem = {
  id: '068-html5-features',
  title: 'HTML5 新特性',
  slug: 'html5-features',
  difficulty: 'easy',
  tags: ['HTML'],
  category: 'HTML',
  description: `
## Description

List at least 5 new semantic tags introduced in HTML5.
Write a simple HTML structure using \`header\`, \`nav\`, \`main\`, \`section\`, \`footer\`.

`,
  templateCode: `<!-- Write semantic HTML structure -->
<header>
  <nav></nav>
</header>
<main>
  <!-- Add section -->
</main>
<footer></footer>`,
  testCases: [],
  hints: [
    "Semantic tags improve SEO and accessibility."
  ],
  createdAt: '2024-01-29'
};
