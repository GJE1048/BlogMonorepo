import type { Problem } from '../../types/problem';

export const lazyLoadProblem: Problem = {
  id: '020-lazy-load',
  title: '懒加载实现 (Lazy Load)',
  slug: 'lazy-load',
  difficulty: 'medium',
  tags: ['Image', 'IntersectionObserver', 'Performance'],
  category: 'Performance',
  description: `
## Description

Implement a function \`lazyLoad(images)\` that accepts a NodeList of images and loads them only when they enter the viewport.
Assume images have \`data-src\` attribute.

## Example

\`\`\`javascript
const images = document.querySelectorAll('img[data-src]');
lazyLoad(images);
\`\`\`
`,
  templateCode: `/**
 * @param {NodeList} images
 */
var lazyLoad = function(images) {
  
};`,
  solutionCode: `/**
 * @param {NodeList} images
 */
var lazyLoad = function(images) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => observer.observe(img));
};`,
  testCases: [
    { input: [], output: 'lazy-loaded' } // Simplified
  ],
  hints: [
    "Use IntersectionObserver API.",
    "When intersecting, set src = data-src and stop observing."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
