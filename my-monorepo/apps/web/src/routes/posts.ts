import { Router } from 'express';
import { query } from '../db/neon';

const router = Router();

const labelToTags = (label?: string): string[] => {
  if (!label) return [];
  if (label === '专栏') return [];
  if (label === '订阅') return [];
  if (label === '合作') return ['协作'];
  return [label];
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
    name: row.author_name ?? 'Unknown',
    title: row.author_title ?? '',
    bio: row.author_bio ?? '',
    avatarUrl: row.author_avatar_url ?? undefined,
    stats: {
      posts: row.author_article_count ?? 0,
      followers: row.author_follower_count ?? 0,
      readingHours: row.author_total_reads ?? 0,
      weeklyCompletion: row.author_weekly_completion_rate ?? 0,
    },
    links: row.author_social_links || [],
  },
  commentCount,
});

router.get('/', async (_req, res) => {
  try {
    const { label } = (_req.query ?? {}) as { label?: string };
    const tagsFilter = labelToTags(label);
    console.log('[DB] GET /posts -> label:', label, 'tagsFilter:', tagsFilter);

    let rows: any[];
    const selectClause = `
      SELECT p.*, COUNT(c.id) AS comment_count,
             a.name as author_name, a.title as author_title, a.bio as author_bio, 
             a.avatar_url as author_avatar_url, a.article_count as author_article_count,
             a.follower_count as author_follower_count, a.total_reads as author_total_reads,
             a.weekly_completion_rate as author_weekly_completion_rate, a.social_links as author_social_links
      FROM posts p
      LEFT JOIN comments c ON c.post_id = p.id
      LEFT JOIN authors a ON p.author_id = a.id
    `;

    if (tagsFilter.length > 0) {
      rows = await query<any>(
        `
        ${selectClause}
        WHERE p.tags && $1::text[]
        GROUP BY p.id, a.id
        ORDER BY p.published_at DESC
        `,
        [tagsFilter]
      );
    } else {
      rows = await query<any>(
        `
        ${selectClause}
        GROUP BY p.id, a.id
        ORDER BY p.published_at DESC
        `
      );
    }
    const posts = rows.map((row: any) =>
      mapRowToPost(row, Number(row.comment_count || 0))
    );
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to load posts' });
  }
});

router.get('/label/:label', async (req, res) => {
  try {
    const { label } = req.params;
    const tagsFilter = labelToTags(label);
    console.log('[DB] GET /posts/label/:label ->', label, 'tagsFilter:', tagsFilter);
    
    const selectClause = `
      SELECT p.*, COUNT(c.id) AS comment_count,
             a.name as author_name, a.title as author_title, a.bio as author_bio, 
             a.avatar_url as author_avatar_url, a.article_count as author_article_count,
             a.follower_count as author_follower_count, a.total_reads as author_total_reads,
             a.weekly_completion_rate as author_weekly_completion_rate, a.social_links as author_social_links
      FROM posts p
      LEFT JOIN comments c ON c.post_id = p.id
      LEFT JOIN authors a ON p.author_id = a.id
    `;

    const rows = await query<any>(
      `
      ${selectClause}
      ${tagsFilter.length > 0 ? 'WHERE p.tags && $1::text[]' : ''}
      GROUP BY p.id, a.id
      ORDER BY p.published_at DESC
      `,
      tagsFilter.length > 0 ? [tagsFilter] : []
    );
    const posts = rows.map((row: any) =>
      mapRowToPost(row, Number(row.comment_count || 0))
    );
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to load posts by label' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ID format (must be integer for SERIAL id)
  if (!/^\d+$/.test(id)) {
    console.warn(`[DB] GET /posts/${id} -> Invalid ID format`);
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    console.log(`[DB] GET /posts/${id} -> querying single post and comment count`);
    const rows = await query<any>(`
      SELECT p.*, 
             a.name as author_name, a.title as author_title, a.bio as author_bio, 
             a.avatar_url as author_avatar_url, a.article_count as author_article_count,
             a.follower_count as author_follower_count, a.total_reads as author_total_reads,
             a.weekly_completion_rate as author_weekly_completion_rate, a.social_links as author_social_links
      FROM posts p
      LEFT JOIN authors a ON p.author_id = a.id
      WHERE p.id = $1 LIMIT 1
    `, [id]);
    const post = rows[0];
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const commentCount = await query<{ count: number }>('SELECT COUNT(*)::int AS count FROM comments WHERE post_id = $1', [id]);
    return res.json({
      ...mapRowToPost(post, commentCount[0]?.count ?? 0),
      content: post.content,
    });
  } catch (error) {
    console.error(`[DB] GET /posts/${id} -> Error:`, error);
    return res.status(500).json({ message: 'Failed to load post' });
  }
});

router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`[DB] GET /posts/${id}/comments -> querying comments`);
    const rows = await query<any>(
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

  try {
    console.log(`[DB] POST /posts/${id}/comments -> inserting comment`);
    const rows = await query<{ id: number; author: string; content: string; created_at: string }>(
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
