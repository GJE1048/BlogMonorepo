import type { Problem } from '../../types/problem';

export const reverseListProblem: Problem = {
  id: '013-reverse-list',
  title: '反转链表 (Reverse Linked List)',
  slug: 'reverse-list',
  difficulty: 'medium',
  tags: ['Linked List', 'Algorithm'],
  category: 'Algorithm',
  description: `
## Description

Given the head of a singly linked list, reverse the list, and return the reversed list.

Definition for singly-linked list.
\`\`\`javascript
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
\`\`\`

## Example

\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\`
`,
  templateCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  
};`,
  testCases: [
    { input: [[1,2,3,4,5]], output: [5,4,3,2,1] } // Simplified representation
  ],
  hints: [
    "Iterate through the list and change the next pointer of each node to point to the previous node.",
    "Keep track of the previous node."
  ],
  createdAt: '2024-01-29',
  solvedCount: 0
};
