import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../src/db/neon';
import { runCors } from '../../../lib/cors-helper';

const TITLE = 'Egenerui：用声明式代码构建高效工具界面的新选择';

const CONTENT = `
Egenerui：用声明式代码构建高效工具界面的新选择

在前端开发领域，构建数据工具、演示原型或内部管理系统时，我们常常需要在“快速实现”和“代码优雅”之间做出妥协。传统的 UI 框架往往配置繁琐，而低代码平台又缺乏灵活性。今天，我们要介绍一个轻量级却功能强大的新成员——Egenerui，它正以独特的声明式理念，重新定义工具类界面的开发体验。

什么是 Egenerui？

Egenerui 是一个专为构建工具界面（Tool UI）设计的声明式 UI 框架。它的核心理念非常纯粹：用最少量的代码，通过统一的组件 API 和事件编排机制，快速搭建出交互流畅的前端应用。

它特别适合数据科学家、后端工程师或全栈开发者，用于快速构建模型演示、数据录入表单或内部调试工具。

目前，该项目已在 npm 发布（版本 0.1.2），采用 MIT 开源协议，代码托管于 GitHub，文档基于 VitePress 构建，清新简洁。

核心特性：为何选择 Egenerui？

极致的声明式语法

在 Egenerui 中，界面即代码。只需导入库，实例化组件，即可生成界面：

\`\`\`ts
import gr from 'egenerui'

const name = gr.Textbox({ label: '姓名', placeholder: '请输入姓名' })
const submit = gr.Button('提交', { variant: 'primary' })
const result = gr.Markdown({ label: '结果', value: '' })

submit.click((n: string) => \`你好，\${n}\`, { inputs: name, outputs: result })

gr.launch([ name, submit, result ], { title: 'Egenerui 示例' })
\`\`\`

丰富的组件生态

输入类：Textbox、Slider、Checkbox、Radio、Dropdown、File 等  
输出类：Label、Markdown  
控制类：Button、主题切换  
布局类：Row/Column、Tabs、Collapsible

强大的事件编排机制

以输入/输出的方式组合业务逻辑，自动连接数据流。

深度解析：Textbox 组件

支持单行、多行、密码模式、类型校验，以及 focus/select/clear 等方法与 onInput/change 事件。

实战示例：带字符计数的文本框

\`\`\`ts
const text = gr.Textbox({ label: "Text", lines: 3, placeholder: "Type something..." })
const counter = gr.Label({ label: "Characters" })
text.change((value) => { counter.value = \`\${value.length} / 500 characters\` })
\`\`\`

快速开始指南

\`\`\`bash
npm install egenerui
\`\`\`

\`\`\`ts
import 'egenerui/style.css'
import gr from 'egenerui'
\`\`\`

文档与示例链接

- 文档（Textbox）：[https://gje1048.github.io/egenerui/components/input/textbox.html](https://gje1048.github.io/egenerui/components/input/textbox.html)
- npm 包：[https://www.npmjs.com/package/egenerui](https://www.npmjs.com/package/egenerui)
- GitHub 仓库：[https://github.com/GJE1048/egenerui](https://github.com/GJE1048/egenerui)

适用场景与未来展望

适用于 AI 模型演示、内部工具、原型设计、教育演示等场景。作为一个处于早期阶段（v0.1.2）的项目，Egenerui 已经展现出了潜力。

结语

少即是多。Egenerui 去除了复杂性，保留了构建界面最核心的要素。无论是快速验证想法还是构建长期维护的内部工具，都值得一试。
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runCors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const existing = await query<any>(
      `SELECT id FROM posts WHERE title = $1 LIMIT 1`,
      [TITLE]
    );

    if (existing.length > 0) {
      return res.json({ id: existing[0].id });
    }

    const inserted = await query<any>(
      `
      INSERT INTO posts (title, excerpt, content, tags, published_at, reading_time, cover_color, author_id)
      VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7)
      RETURNING id
      `,
      [
        TITLE,
        '用声明式代码构建高效工具界面的新选择。',
        CONTENT,
        ['Frontend', 'UI', 'Tool', 'Egenerui'],
        '8 分钟阅读',
        'bg-pink-600',
        1,
      ]
    );

    return res.json({ id: inserted[0].id });
  } catch (error) {
    console.error('Error ensuring Egenerui post:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
