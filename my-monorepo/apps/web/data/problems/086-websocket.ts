import type { Problem } from '../../types/problem';

export const websocketProblem: Problem = {
  id: '086-websocket',
  title: 'WebSocket',
  slug: 'websocket',
  difficulty: 'medium',
  tags: ['Network', 'WebSocket'],
  category: 'Network',
  description: `
## Description

Explain how WebSocket works (Upgrade request).
Implement a simple client-side WebSocket wrapper class that handles reconnection.

## Task
Implement \`MyWebSocket\` class:
- \`connect(url)\`: Connect to server.
- \`send(data)\`: Send data.
- \`close()\`: Close connection.
- Should automatically reconnect on close (after delay).
`,
  templateCode: `class MyWebSocket {
  constructor() {
    this.socket = null;
  }

  connect(url) {
    this.url = url;
    this.socket = new WebSocket(url);
    
    this.socket.onopen = () => {
      console.log('Connected');
    };
    
    this.socket.onclose = () => {
      console.log('Closed');
      // Implement reconnect logic
    };
  }
  
  send(data) {
    // Check if open
  }
}`,
  testCases: [],
  hints: [
    "Use setTimeout for reconnection.",
    "Check socket.readyState before sending."
  ],
  createdAt: '2024-01-29'
};
