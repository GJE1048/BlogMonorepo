import type { Problem } from '../../types/problem';

export const responsiveDesignProblem: Problem = {
  id: '066-responsive-design',
  title: '响应式设计 (Responsive Design)',
  slug: 'responsive-design',
  difficulty: 'easy',
  tags: ['CSS', 'Media Query'],
  category: 'CSS',
  description: `
## Description

Write a Media Query for mobile devices (max-width: 768px).
Change the background color of \`.container\` to 'blue' on mobile, and 'red' by default (desktop).

`,
  templateCode: `.container {
  background-color: red;
}

/* Add media query here */
@media (max-width: 768px) {
  
}`,
  testCases: [],
  hints: [
    "@media (max-width: 768px) { .container { background-color: blue; } }"
  ],
  createdAt: '2024-01-29'
};
