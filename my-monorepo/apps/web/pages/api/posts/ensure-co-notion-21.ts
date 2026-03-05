import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../src/db/neon';
import { runCors } from '../../../lib/cors-helper';

const TITLE = 'Co-Notion：下一代 AI 驱动的多人协同文档平台';
const FIXED_ID = 21;

const CONTENT = `
Co-Notion：下一代 AI 驱动的多人协同文档平台

在远程协作和知识管理日益重要的今天，我们需要的不仅仅是一个简单的笔记工具，而是一个能够理解内容、支持实时协作并智能辅助创作的智能平台。Co-Notion 正是为此而生——一个基于现代技术栈构建的、开源的 AI 驱动多人协同文档系统。

项目简介

Co-Notion 旨在融合 Notion 的灵活性与 Google Docs 的实时协作能力，并注入 AI 智能。它允许团队成员在同一文档上实时编辑，同时利用 AI 能力进行内容生成、摘要总结、语法校正和智能推荐。

核心技术栈

- 前端：Next.js、React、Tailwind CSS、Lucide React
- 后端：tRPC、Clerk、Upstash Redis
- 数据库与 ORM：PostgreSQL、Drizzle ORM、Drizzle Kit、Drizzle Zod
- 实时协作：Yjs、y-websocket、自定义 WebSocket 服务
- 存储：AWS S3
- 集成：Svix、Ngrok 等

核心能力

- 实时多人协作：基于 Yjs CRDT 与 WebSocket，实现低延迟、无冲突的同步与光标共享
- AI 智能辅助：内容生成、智能润色、自动摘要、知识库问答
- 安全与权限：Clerk 驱动的用户管理与会话控制，支持文档级权限
- 模块化架构：清晰的 app/modules/components/trpc/db/realtime 分层

本地运行

1) 克隆仓库并安装依赖：
\`\`\`bash
git clone https://github.com/GJE1048/co-notion.git
cd co-notion
pnpm install
\`\`\`
2) 配置环境变量并初始化数据库：
\`\`\`bash
pnpm db:generate
pnpm db:push
\`\`\`
3) 启动服务：
\`\`\`bash
pnpm dev:all
\`\`\`

更多信息

- GitHub 仓库：https://github.com/GJE1048/co-notion
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runCors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const authorRes = await query<any>('SELECT id FROM authors WHERE id = 1');
    if (authorRes.length === 0) {
      await query<any>(
        `INSERT INTO authors (id, name, title, bio, article_count, follower_count, total_reads, weekly_completion_rate)
         VALUES (1, 'GJE', '内容与产品', '结构化表达与长期复用。', 0, 0, 0, 0)`
      );
    }
    const existing = await query<any>(
      `SELECT id FROM posts WHERE id = $1 LIMIT 1`,
      [FIXED_ID]
    );

    if (existing.length > 0) {
      await query<any>(
        `
        UPDATE posts 
        SET title = $1, excerpt = $2, content = $3, tags = $4, reading_time = $5, cover_color = $6, author_id = $7
        WHERE id = $8
        `,
        [
          TITLE,
          'AI 驱动的多人协同文档平台，融合实时协作与智能辅助。',
          CONTENT,
          ['Collaboration', 'AI', 'Realtime', 'Yjs'],
          '10 分钟阅读',
          'bg-cyan-600',
          1,
          FIXED_ID,
        ]
      );
      return res.json({ id: FIXED_ID });
    }

    await query<any>(
      `
      INSERT INTO posts (id, title, excerpt, content, tags, published_at, reading_time, cover_color, author_id)
      VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7, $8)
      `,
      [
        FIXED_ID,
        TITLE,
        'AI 驱动的多人协同文档平台，融合实时协作与智能辅助。',
        CONTENT,
        ['Collaboration', 'AI', 'Realtime', 'Yjs'],
        '10 分钟阅读',
        'bg-cyan-600',
        1,
      ]
    );

    return res.json({ id: FIXED_ID });
  } catch (error) {
    console.error('Error ensuring Co-Notion post (id=21):', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
