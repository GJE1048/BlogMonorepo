import { Router } from 'express';
import { query, isDbConfigured } from '../db/neon';
import { sampleComments, samplePosts } from '../data/sampleData';

const router = Router();

const baseAuthor = {
  stats: {
    posts: 128,
    followers: 24650,
    readingHours: 1820,
  },
  links: [
    { label: '专栏', href: '#' },
    { label: '订阅', href: '#' },
    { label: '合作', href: '#' },
  ],
};

const normalizeTags = (tags: unknown) => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    }
  }
  return [];
};

const mapRowToPost = (row: any, commentCount = 0) => ({
  id: String(row.id),
  title: row.title,
  excerpt: row.excerpt,
  tags: normalizeTags(row.tags),
  publishedAt: row.published_at,
  readingTime: row.reading_time,
  coverColor: row.cover_color,
  author: {
    name: row.author_name ?? '林知夏',
    title: row.author_title ?? '产品设计师 / 写作者',
    bio: row.author_bio ?? '关注体验与效率的交汇点，记录关于设计、产品与 AI 的长期观察。',
    ...baseAuthor,
  },
  commentCount,
});

router.get('/', async (_req, res) => {
  if (!isDbConfigured) {
    const posts = samplePosts.map((post) =>
      mapRowToPost(
        post,
        (sampleComments[post.id]?.length ?? 0)
      )
    );
    return res.json(posts);
  }

  try {
    const rows = await query(
      `
      SELECT p.*, COUNT(c.id) AS comment_count
      FROM posts p
      LEFT JOIN comments c ON c.post_id = p.id
      GROUP BY p.id
      ORDER BY p.published_at DESC
      `
    );
    const posts = rows.map((row: any) =>
      mapRowToPost(row, Number(row.comment_count || 0))
    );
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load posts' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!isDbConfigured) {
    const post = samplePosts.find((item) => item.id === id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.json({
      ...mapRowToPost(post, sampleComments[id]?.length ?? 0),
      content: post.content,
    });
  }

  try {
    const rows = await query('SELECT * FROM posts WHERE id = $1 LIMIT 1', [id]);
    const post = rows[0];
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const commentCount = await query('SELECT COUNT(*)::int AS count FROM comments WHERE post_id = $1', [id]);
    return res.json({
      ...mapRowToPost(post, commentCount[0]?.count ?? 0),
      content: post.content,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load post' });
  }
});

router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  if (!isDbConfigured) {
    const comments = (sampleComments[id] ?? []).map((comment) => ({
      id: comment.id,
      author: comment.author,
      content: comment.content,
      createdAt: comment.created_at,
    }));
    return res.json(comments);
  }

  try {
    const rows = await query(
      'SELECT id, author, content, created_at FROM comments WHERE post_id = $1 ORDER BY created_at DESC',
      [id]
    );
    const comments = rows.map((row: any) => ({
      id: row.id,
      author: row.author,
      content: row.content,
      createdAt: row.created_at,
    }));
    return res.json(comments);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load comments' });
  }
});

router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body as { author?: string; content?: string };

  if (!author || !content) {
    return res.status(400).json({ message: 'author and content are required' });
  }

  if (!isDbConfigured) {
    const newComment = {
      id: `c-${Date.now()}`,
      author,
      content,
      created_at: new Date().toISOString().slice(0, 10),
    };
    const current = sampleComments[id] ?? [];
    sampleComments[id] = [newComment, ...current];
    return res.status(201).json({
      id: newComment.id,
      author: newComment.author,
      content: newComment.content,
      createdAt: newComment.created_at,
    });
  }

  try {
    const rows = await query(
      'INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3) RETURNING id, author, content, created_at',
      [id, author, content]
    );
    const created = rows[0];
    return res.status(201).json({
      id: created.id,
      author: created.author,
      content: created.content,
      createdAt: created.created_at,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create comment' });
  }
});

export default router;
