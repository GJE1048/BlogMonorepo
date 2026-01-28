
import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not defined in .env');
  process.exit(1);
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

const REAL_CODE_POSTS = [
  {
    title: 'Next.js 14 Server Actions 实战：告别 API Routes',
    excerpt: 'Server Actions 允许你在服务器端直接运行异步代码。本文演示如何使用 Server Actions 处理表单提交、乐观更新和错误处理，完全替代传统的 API Route 模式。',
    content: `
Server Actions 是 Next.js 14 中最激动人心的特性之一。它让我们不再需要手动创建 API Endpoints 来处理数据变更。

### 1. 基础表单提交

在 Server Component 中直接定义 Action：

\`\`\`typescript:app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')

  await db.post.create({
    data: {
      title: title as string,
      content: content as string,
    },
  })

  revalidatePath('/posts')
}
\`\`\`

在 Client Component 中使用：

\`\`\`tsx:components/CreatePost.tsx
'use client'

import { createPost } from '@/app/actions'

export function CreatePost() {
  return (
    <form action={createPost}>
      <input type="text" name="title" className="border p-2" />
      <textarea name="content" className="border p-2" />
      <button type="submit">发布</button>
    </form>
  )
}
\`\`\`

### 2. 乐观更新 (Optimistic Updates)

使用 \`useOptimistic\` 钩子实现即时反馈。

\`\`\`tsx:components/LikeButton.tsx
'use client'

import { useOptimistic } from 'react'
import { incrementLike } from '@/app/actions'

export function LikeButton({ post }: { post: Post }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    post.likes,
    (state, newLike: number) => state + newLike
  )

  return (
    <form action={async () => {
      addOptimisticLike(1)
      await incrementLike(post.id)
    }}>
      <button type="submit">
        ❤️ {optimisticLikes}
      </button>
    </form>
  )
}
\`\`\`

### 3. 错误处理与 Pending 状态

使用 \`useFormStatus\` 和 \`useFormState\`。

\`\`\`tsx:components/SubmitButton.tsx
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  )
}
\`\`\`
    `,
    tags: ['Next.js', 'React', 'Server Actions', 'Fullstack'],
    reading_time: '15 分钟阅读',
    cover_color: 'bg-black',
    author_id: 1,
  },
  {
    title: 'TypeScript 类型体操：从入门到精通',
    excerpt: '掌握 TypeScript 高级类型系统是区分初级和高级前端工程师的关键。本文深入讲解泛型、条件类型、映射类型以及 infer 关键字的妙用。',
    content: `
TypeScript 的类型系统是图灵完备的。这意味着你可以用类型系统本身来编写逻辑。

### 1. 实现 Pick 和 Omit

了解内置工具类型的原理：

\`\`\`typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyOmit<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>;

interface User {
  id: number;
  name: string;
  email: string;
}

type UserPreview = MyPick<User, 'id' | 'name'>;
// { id: number; name: string; }
\`\`\`

### 2. 条件类型与 infer

\`infer\` 关键字允许我们在条件类型中推断类型变量。

\`\`\`typescript
// 获取函数返回值的类型
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getUser() {
  return { id: 1, name: 'Alice' };
}

type UserType = MyReturnType<typeof getUser>;
// { id: number; name: string; }
\`\`\`

### 3. 递归类型

实现一个深度只读类型 \`DeepReadonly\`：

\`\`\`typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

interface NestedObj {
  a: {
    b: {
      c: string;
    };
  };
}

type ReadonlyObj = DeepReadonly<NestedObj>;
// ReadonlyObj.a.b.c 也是只读的
\`\`\`

### 4. 模板字面量类型

\`\`\`typescript
type World = "world";
type Greeting = \`hello \${World}\`; // "hello world"

type CssPadding = \`padding-\${\"top\" | \"bottom\" | \"left\" | \"right\"}\`;
// "padding-top" | "padding-bottom" | "padding-left" | "padding-right"
\`\`\`
    `,
    tags: ['TypeScript', 'Programming', 'Frontend'],
    reading_time: '20 分钟阅读',
    cover_color: 'bg-blue-700',
    author_id: 1,
  },
  {
    title: '构建高性能 Rust 异步运行时',
    excerpt: '深入理解 Rust 的 async/await 机制。我们将探讨 Future trait 的工作原理，以及如何使用 Tokio 构建高并发网络服务。',
    content: `
Rust 的异步模型是 "Zero-cost abstractions" 的典范。

### 1. Future Trait

Rust 的异步核心是 \`Future\` trait。它类似于 JavaScript 的 Promise，但是它是惰性的（Lazy）。

\`\`\`rust
pub trait Future {
    type Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}

pub enum Poll<T> {
    Ready(T),
    Pending,
}
\`\`\`

除非你通过 \`.await\` 或执行器（Executor）去轮询它，否则 Future 什么都不会做。

### 2. 使用 Tokio 构建 TCP Echo Server

Tokio 是 Rust 最流行的异步运行时。

\`\`\`rust:src/main.rs
use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;

    loop {
        let (mut socket, _) = listener.accept().await?;

        tokio::spawn(async move {
            let mut buf = [0; 1024];

            // In a loop, read data from the socket and write the data back.
            loop {
                let n = match socket.read(&mut buf).await {
                    // socket closed
                    Ok(n) if n == 0 => return,
                    Ok(n) => n,
                    Err(e) => {
                        eprintln!("failed to read from socket; err = {:?}", e);
                        return;
                    }
                };

                // Write the data back
                if let Err(e) = socket.write_all(&buf[0..n]).await {
                    eprintln!("failed to write to socket; err = {:?}", e);
                    return;
                }
            }
        });
    }
}
\`\`\`

### 3. 在线程间共享状态

使用 \`Arc\` 和 \`Mutex\` 在异步任务间安全地共享状态。

\`\`\`rust
use std::sync::Arc;
use tokio::sync::Mutex;

type Db = Arc<Mutex<HashMap<String, String>>>;

#[tokio::main]
async fn main() {
    let db: Db = Arc::new(Mutex::new(HashMap::new()));

    // ... pass db to handlers
}
\`\`\`
    `,
    tags: ['Rust', 'Backend', 'Concurrency', 'Systems Programming'],
    reading_time: '25 分钟阅读',
    cover_color: 'bg-orange-700',
    author_id: 1,
  },
    {
    title: 'CSS Grid 布局完全指南：从基础到网格系统',
    excerpt: 'Flexbox 是一维布局的大师，而 Grid 则是二维布局的王者。本文通过丰富的代码示例，带你征服 CSS Grid。',
    content: `
CSS Grid Layout 是 CSS 中最强大的布局系统。

### 1. 定义网格

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三列等宽 */
  grid-template-rows: 100px 200px;
  gap: 20px;
}
\`\`\`

### 2. 网格区域 (Grid Areas)

这是 Grid 最酷的特性之一，可以直观地描述布局。

\`\`\`css
.item-a { grid-area: header; }
.item-b { grid-area: main; }
.item-c { grid-area: sidebar; }
.item-d { grid-area: footer; }

.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}
\`\`\`

### 3. 实现圣杯布局 (Holy Grail Layout)

\`\`\`html
<div class="grid-container">
  <header>Header</header>
  <nav>Nav</nav>
  <main>Main Content</main>
  <aside>Aside</aside>
  <footer>Footer</footer>
</div>
\`\`\`

\`\`\`css
.grid-container {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "nav"
      "main"
      "aside"
      "footer";
  }
}
\`\`\`
    `,
    tags: ['CSS', 'Frontend', 'Design'],
    reading_time: '10 分钟阅读',
    cover_color: 'bg-purple-600',
    author_id: 1,
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Connected to database');
    
    // Ensure author exists
    const authorRes = await client.query('SELECT id FROM authors WHERE id = 1');
    if (authorRes.rows.length === 0) {
       console.log('Creating default author...');
       await client.query(`
        INSERT INTO authors (id, name, title, bio, article_count, follower_count, total_reads, weekly_completion_rate)
        VALUES (1, '林知夏', '产品设计师 / 写作者', '关注体验与效率的交汇点...', 0, 0, 0, 0)
      `);
    }

    console.log('Inserting real code posts...');
    for (const post of REAL_CODE_POSTS) {
      await client.query(`
        INSERT INTO posts (title, excerpt, content, tags, published_at, reading_time, cover_color, author_id)
        VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7)
      `, [post.title, post.excerpt, post.content, post.tags, post.reading_time, post.cover_color, post.author_id]);
    }
    
    console.log(`Successfully inserted ${REAL_CODE_POSTS.length} real code posts.`);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
