import type { Problem } from '../../types/problem';

export const cssAnimationProblem: Problem = {
  id: '065-css-animation',
  title: 'CSS 动画 (CSS Animation)',
  slug: 'css-animation',
  difficulty: 'easy',
  tags: ['CSS', 'Animation'],
  category: 'CSS',
  description: `
## Description

Create a keyframe animation named \`fade-in\`.
It should go from \`opacity: 0\` to \`opacity: 1\`.
Apply it to the \`.box\` class with a duration of 2s.

`,
  templateCode: `@keyframes fadeIn {
  /* Your code here */
}

.box {
  /* Apply animation here */
  
}`,
  testCases: [],
  hints: [
    "from { opacity: 0 } to { opacity: 1 }",
    "animation: fadeIn 2s;"
  ],
  createdAt: '2024-01-29'
};
