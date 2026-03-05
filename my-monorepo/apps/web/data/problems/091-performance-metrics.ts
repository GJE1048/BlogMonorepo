import type { Problem } from '../../types/problem';

export const performanceMetricsProblem: Problem = {
  id: '091-performance-metrics',
  title: 'Web Vitals (LCP, FID, CLS)',
  slug: 'performance-metrics',
  difficulty: 'medium',
  tags: ['Performance', 'Web Vitals'],
  category: 'Performance',
  description: `
## Description

Explain Core Web Vitals:
- **LCP (Largest Contentful Paint)**: Loading performance.
- **FID (First Input Delay)**: Interactivity.
- **CLS (Cumulative Layout Shift)**: Visual stability.
- **INP (Interaction to Next Paint)**: New metric replacing FID.

## Task
Return the metric name based on the description.
`,
  templateCode: `/**
 * @param {string} description
 * @return {'LCP' | 'FID' | 'CLS' | 'INP'}
 */
function identifyMetric(description) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Loading -> LCP",
    "Stability/Shift -> CLS",
    "Input Delay -> FID",
    "Interaction Latency -> INP"
  ],
  createdAt: '2024-01-29'
};
