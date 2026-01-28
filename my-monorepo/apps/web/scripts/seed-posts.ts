
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

const SAMPLE_POSTS = [
  {
    title: '深入理解 React Server Components',
    excerpt: 'React Server Components (RSC) 正在改变我们构建 Web 应用的方式。本文将深入探讨其工作原理、优势以及在 Next.js 中的实际应用。',
    content: 'React Server Components... (full content)',
    tags: ['React', 'Next.js', 'Frontend'],
    reading_time: '12 分钟阅读',
    cover_color: 'bg-blue-500',
    author_id: 1,
  },
  {
    title: '现代 CSS：Tailwind 与 CSS Variables 的完美结合',
    excerpt: 'Tailwind CSS v4 带来了更强大的 CSS 变量支持。了解如何构建一个灵活、可维护的设计系统。',
    content: 'CSS Variables... (full content)',
    tags: ['CSS', 'Tailwind', 'Design'],
    reading_time: '8 分钟阅读',
    cover_color: 'bg-teal-500',
    author_id: 1,
  },
  {
    title: 'TypeScript 高级类型实战指南',
    excerpt: '从泛型到条件类型，掌握 TypeScript 高级特性，让你的代码更加健壮和类型安全。',
    content: 'TypeScript... (full content)',
    tags: ['TypeScript', 'Programming'],
    reading_time: '15 分钟阅读',
    cover_color: 'bg-blue-600',
    author_id: 1,
  },
  {
    title: '构建高性能的 Web 应用：性能优化清单',
    excerpt: 'Lighthouse 满分指南。涵盖图片优化、代码分割、缓存策略等关键技术点。',
    content: 'Performance... (full content)',
    tags: ['Performance', 'Web'],
    reading_time: '10 分钟阅读',
    cover_color: 'bg-green-500',
    author_id: 1,
  },
  {
    title: 'Node.js 异步编程的最佳实践',
    excerpt: 'Promise, Async/Await, 以及如何避免回调地狱。深入理解 Node.js 的事件循环机制。',
    content: 'Node.js... (full content)',
    tags: ['Node.js', 'Backend'],
    reading_time: '9 分钟阅读',
    cover_color: 'bg-green-600',
    author_id: 1,
  },
  {
    title: 'UI 设计心理学：如何引导用户行为',
    excerpt: '设计不仅仅是好看。了解色彩心理学、排版原则以及如何通过设计提升用户体验。',
    content: 'Design... (full content)',
    tags: ['Design', 'UX'],
    reading_time: '7 分钟阅读',
    cover_color: 'bg-purple-500',
    author_id: 1,
  },
  {
    title: 'Rust 语言初探：所有权与借用',
    excerpt: 'Rust 以其内存安全性著称。本文介绍 Rust 的核心概念：所有权系统，帮助你迈出 Rust 编程的第一步。',
    content: 'Rust... (full content)',
    tags: ['Rust', 'Programming'],
    reading_time: '20 分钟阅读',
    cover_color: 'bg-orange-500',
    author_id: 1,
  },
  {
    title: '微服务架构下的数据一致性',
    excerpt: '分布式事务、Saga 模式、CAP 理论。如何在微服务架构中保证数据的最终一致性。',
    content: 'Microservices... (full content)',
    tags: ['Architecture', 'Backend'],
    reading_time: '18 分钟阅读',
    cover_color: 'bg-indigo-500',
    author_id: 1,
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Connected to database');
    
    // Check if author exists
    const authorRes = await client.query('SELECT id FROM authors WHERE id = 1');
    if (authorRes.rows.length === 0) {
      console.log('Creating default author...');
      await client.query(`
        INSERT INTO authors (id, name, title, bio, article_count, follower_count, total_reads, weekly_completion_rate)
        VALUES (1, '林知夏', '产品设计师 / 写作者', '关注体验与效率的交汇点...', 0, 0, 0, 0)
      `);
    }

    console.log('Inserting posts...');
    for (const post of SAMPLE_POSTS) {
      await client.query(`
        INSERT INTO posts (title, excerpt, content, tags, published_at, reading_time, cover_color, author_id)
        VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7)
      `, [post.title, post.excerpt, post.content, post.tags, post.reading_time, post.cover_color, post.author_id]);
    }
    
    console.log(`Successfully inserted ${SAMPLE_POSTS.length} posts.`);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
