import type { Problem } from '../../types/problem';

export const longestCommonSubsequenceProblem: Problem = {
  id: '036-longest-common-subsequence',
  title: '最长公共子序列 (LCS)',
  slug: 'longest-common-subsequence',
  difficulty: 'medium',
  tags: ['Algorithm', 'DP', 'String'],
  category: 'Algorithm',
  description: `
## Description

Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

## Example

\`\`\`javascript
const text1 = "abcde";
const text2 = "ace";
// "ace" is a subsequence of "abcde"
console.log(longestCommonSubsequence(text1, text2)); // 3
\`\`\`
`,
  templateCode: `/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function longestCommonSubsequence(text1, text2) {
  // Your code here
  
}`,
  solutionCode: `/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
};`,
  testCases: [
    { input: ["abcde", "ace"], output: 3 },
    { input: ["abc", "abc"], output: 3 },
    { input: ["abc", "def"], output: 0 }
  ],
  hints: [
    "Use a 2D array dp[i][j].",
    "dp[i][j] represents LCS of text1[0..i] and text2[0..j].",
    "If text1[i] == text2[j], dp[i][j] = dp[i-1][j-1] + 1.",
    "Else, dp[i][j] = max(dp[i-1][j], dp[i][j-1])."
  ],
  createdAt: '2024-01-29'
};
