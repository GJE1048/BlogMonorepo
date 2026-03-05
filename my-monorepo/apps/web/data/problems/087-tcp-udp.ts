import type { Problem } from '../../types/problem';

export const tcpUdpProblem: Problem = {
  id: '087-tcp-udp',
  title: 'TCP vs UDP',
  slug: 'tcp-udp',
  difficulty: 'medium',
  tags: ['Network', 'TCP/IP'],
  category: 'Network',
  description: `
## Description

Compare TCP and UDP.
Return 'TCP' or 'UDP' based on the characteristic or use case.

Characteristics:
- TCP: Reliable, Ordered, Connection-oriented, Heavyweight.
- UDP: Unreliable, Unordered, Connectionless, Lightweight.

Use Cases:
- Web browsing (HTTP/1.1, HTTP/2) -> TCP
- File transfer (FTP) -> TCP
- Video streaming (Live), VoIP -> UDP (often)
- DNS -> UDP (mostly)
`,
  templateCode: `/**
 * @param {string} characteristic
 * @return {'TCP' | 'UDP'}
 */
function chooseProtocol(characteristic) {
  // Your code here
  
}`,
  testCases: [],
  hints: [
    "Reliability = TCP",
    "Speed/Real-time = UDP"
  ],
  createdAt: '2024-01-29'
};
