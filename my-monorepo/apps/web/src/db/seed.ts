import { query } from './neon';

const createTables = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      tags TEXT[],
      published_at DATE,
      reading_time TEXT,
      cover_color TEXT,
      author_name TEXT,
      author_title TEXT,
      author_bio TEXT
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
};

const seedPosts = async () => {
  const rows = await query<{ count: number }>('SELECT COUNT(*)::int AS count FROM posts');
  if (rows[0]?.count) return;

  const seeds = [
    {
      title: '从灵感到落地：如何搭建高效的内容生产系统',
      excerpt: '系统化不是束缚，而是让灵感稳定交付的方法。分享我的一套内容工作流与工具组合。',
      content:
        '一个稳定的内容系统，首先需要一个清晰的主题地图。\n\n我会把年度主线拆成季度议题，再细化到每周的三类内容：方法论、案例、观点。这样即便没有灵感，也有足够的结构支持输出。\n\n其次是素材的流转方式。日常的灵感用一个轻量的收集池储存，每周统一整理到卡片库，再按主题归档。\n\n最后是交付节奏。高频内容保持一致的模板，低频深度内容留给更完整的创作窗口。系统的目标不是更快，而是更稳定。',
      tags: ['内容策略', '工作流', '增长'],
      publishedAt: '2026-01-18',
      readingTime: '8 分钟阅读',
      coverColor: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)',
      authorName: '林知夏',
      authorTitle: '产品设计师 / 写作者',
      authorBio: '关注体验与效率的交汇点，记录关于设计、产品与 AI 的长期观察。',
    },
    {
      title: '在产品里塑造信任感：12 个可执行的设计细节',
      excerpt: '信任不是一句标语，而是每一个交互细节的总和。这里是我总结的十二个小动作。',
      content:
        '信任感常常藏在细节里。\n\n从产品文案的语气、错误提示的可恢复性，到加载动画的预期控制，这些细节组成用户的情绪路径。\n\n我建议团队建立一份“信任检查清单”，每次上线都进行一次扫描。\n\n当这些细节被持续打磨，产品自然会表现出稳定、可靠、可以依赖的气质。',
      tags: ['设计细节', '用户体验', '信任'],
      publishedAt: '2026-01-12',
      readingTime: '10 分钟阅读',
      coverColor: 'linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)',
      authorName: '林知夏',
      authorTitle: '产品设计师 / 写作者',
      authorBio: '关注体验与效率的交汇点，记录关于设计、产品与 AI 的长期观察。',
    },
    {
      title: 'AI 与内容团队的协作方式：从试验到体系化',
      excerpt: 'AI 不只是效率工具，更是内容策略的伙伴。我们如何在团队里建立协作原则？',
      content:
        '我们从一个小型试验开始，引入 AI 辅助整理访谈和资料。\n\n当团队建立了验证机制，AI 的效率才真正体现。\n\n关键不在工具，而在协作方式：谁负责验证，谁负责转化，谁负责产出。\n\n当流程清晰之后，AI 会成为内容系统中的稳定模块。',
      tags: ['AI', '内容团队', '协作'],
      publishedAt: '2026-01-05',
      readingTime: '7 分钟阅读',
      coverColor: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
      authorName: '林知夏',
      authorTitle: '产品设计师 / 写作者',
      authorBio: '关注体验与效率的交汇点，记录关于设计、产品与 AI 的长期观察。',
    },
  ];

  for (const post of seeds) {
    await query(
      `INSERT INTO posts (title, excerpt, content, tags, published_at, reading_time, cover_color, author_name, author_title, author_bio)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`
      ,
      [
        post.title,
        post.excerpt,
        post.content,
        post.tags,
        post.publishedAt,
        post.readingTime,
        post.coverColor,
        post.authorName,
        post.authorTitle,
        post.authorBio,
      ]
    );
  }
};

export const initDatabase = async () => {
  await createTables();
  await seedPosts();
};
