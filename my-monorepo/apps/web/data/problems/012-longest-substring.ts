import type { Problem } from '../../types/problem';

export const lengthOfLongestSubstringProblem: Problem = {
  id: '012-longest-substring',
  title: '最长无重复子串 (Longest Substring Without Repeating Characters)',
  slug: 'longest-substring',
  difficulty: 'medium',
  tags: ['String', 'Sliding Window', 'Algorithm'],
  category: 'Algorithm',
  description: `
## Description

Given a string s, find the length of the longest substring without repeating characters.

## Example

\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`
`,
  templateCode: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  
};`,
  testCases: [
    { input: ["abcabcbb"], output: 3 },
    { input: ["bbbbb"], output: 1 }
  ],
  hints: [
    "Use a sliding window.",
    "Keep a set or map of characters in the current window."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
