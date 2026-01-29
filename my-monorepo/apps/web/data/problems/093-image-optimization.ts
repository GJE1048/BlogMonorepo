import type { Problem } from '../../types/problem';

export const imageOptimizationProblem: Problem = {
  id: '093-image-optimization',
  title: 'Image Optimization',
  slug: 'image-optimization',
  difficulty: 'easy',
  tags: ['Performance', 'Media'],
  category: 'Performance',
  description: `
## Description

List techniques for image optimization:
- Format (WebP, AVIF)
- Compression
- Responsive images (srcset, sizes)
- Lazy loading (loading="lazy")

## Task
Implement a function that generates a \`srcset\` string for a given image URL and widths.
Input: url="img.jpg", widths=[300, 600, 900]
Output: "img-300.jpg 300w, img-600.jpg 600w, img-900.jpg 900w" (assuming naming convention).
`,
  templateCode: `/**
 * @param {string} baseUrl
 * @param {number[]} widths
 * @return {string}
 */
function generateSrcset(baseUrl, widths) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Split extension.",
    "Map widths to filenames.",
    "Join with comma."
  ],
  createdAt: '2024-01-29'
};
