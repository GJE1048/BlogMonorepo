import type { Problem } from '../../types/problem';

export const networkOptimizationProblem: Problem = {
  id: '097-network-optimization',
  title: 'Network Optimization',
  slug: 'network-optimization',
  difficulty: 'medium',
  tags: ['Performance', 'Network'],
  category: 'Performance',
  description: `
## Description

List network optimization techniques:
- HTTP/2 (Multiplexing)
- Compression (Gzip, Brotli)
- CDN (Edge caching)
- Caching policies (Cache-Control)

## Task
Calculate the reduced size.
Input: originalSize, compressionRatio (0-1).
Return: newSize.
`,
  templateCode: `/**
 * @param {number} originalSize
 * @param {number} compressionRatio
 * @return {number}
 */
function calculateCompressedSize(originalSize, compressionRatio) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "size * (1 - ratio)?" // careful with definition, usually ratio is reduction or remaining. Let's assume ratio is how much is REMOVED.
  ],
  createdAt: '2024-01-29'
};
