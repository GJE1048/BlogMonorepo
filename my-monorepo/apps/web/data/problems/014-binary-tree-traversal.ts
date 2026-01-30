import type { Problem } from '../../types/problem';

export const binaryTreeTraversalProblem: Problem = {
  id: '014-binary-tree-traversal',
  title: '二叉树遍历 (Binary Tree Traversal)',
  slug: 'binary-tree-traversal',
  difficulty: 'medium',
  tags: ['Tree', 'Recursion', 'Algorithm'],
  category: 'Algorithm',
  description: `
## Description

Given the root of a binary tree, return the inorder traversal of its nodes' values.

Definition for a binary tree node.
\`\`\`javascript
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
\`\`\`

## Example

\`\`\`
Input: root = [1,null,2,3]
Output: [1,3,2]
\`\`\`
`,
  templateCode: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  
};`,
  solutionCode: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const result = [];
  const traverse = (node) => {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  };
  traverse(root);
  return result;
};`,
  testCases: [
    { input: [[1,null,2,3]], output: [1,3,2] } // Simplified
  ],
  hints: [
    "Recursion is the easiest way.",
    "Inorder: Left -> Root -> Right"
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
