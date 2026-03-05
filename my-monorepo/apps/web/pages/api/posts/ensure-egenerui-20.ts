import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../src/db/neon';
import { runCors } from '../../../lib/cors-helper';

const TITLE = 'Egenerui：用声明式代码构建高效工具界面的新选择';
const FIXED_ID = 20;

const CONTENT = `
Egenerui：用声明式代码构建高效工具界面的新选择

在前端开发领域，构建数据工具、演示原型或内部管理系统时，我们常常需要在“快速实现”和“代码优雅”之间做出妥协。传统的 UI 框架往往配置繁琐，而低代码平台又缺乏灵活性。今天，我们要介绍一个轻量级却功能强大的新成员——Egenerui，它正以独特的声明式理念，重新定义工具类界面的开发体验。

什么是 Egenerui？

Egenerui 是一个专为构建工具界面（Tool UI）设计的声明式 UI 框架。它的核心理念非常纯粹：用最少量的代码，通过统一的组件 API 和事件编排机制，快速搭建出交互流畅的前端应用。

它特别适合数据科学家、后端工程师或全栈开发者，用于快速构建模型演示、数据录入表单或内部调试工具。

目前，该项目已在 npm 发布（版本 0.1.2），采用 MIT 开源协议，代码托管于 GitHub，文档基于 VitePress 构建，清新简洁。

文档与示例链接

- 文档（Textbox）：https://gje1048.github.io/egenerui/components/input/textbox.html
- npm 包：https://www.npmjs.com/package/egenerui
- GitHub 仓库：https://github.com/GJE1048/egenerui
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
          '用声明式代码构建高效工具界面的新选择。',
          CONTENT,
          ['Frontend', 'UI', 'Tool', 'Egenerui'],
          '8 分钟阅读',
          'bg-pink-600',
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
        '用声明式代码构建高效工具界面的新选择。',
        CONTENT,
        ['Frontend', 'UI', 'Tool', 'Egenerui'],
        '8 分钟阅读',
        'bg-pink-600',
        1,
      ]
    );

    return res.json({ id: FIXED_ID });
  } catch (error) {
    console.error('Error ensuring Egenerui post (id=20):', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
