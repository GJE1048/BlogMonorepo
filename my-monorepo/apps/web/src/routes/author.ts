import express from 'express';
import { query } from '../db/neon';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!/^\d+$/.test(id)) {
    // If id is not a number, it might be a request for "default" or "me" if we supported that.
    // For now, return 400.
    return res.status(400).json({ message: 'Invalid author ID' });
  }

  try {
    const rows = await query<any>(
      `SELECT * FROM authors WHERE id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const author = rows[0];
    // Parse social_links if it's a string (though pg driver usually parses jsonb automatically, 
    // but sometimes it depends on config. Let's be safe).
    // Actually pg parses JSON/JSONB columns to objects.
    
    // Map snake_case to camelCase for frontend consistency
    const response = {
      id: author.id,
      name: author.name,
      title: author.title,
      bio: author.bio,
      avatarUrl: author.avatar_url,
      stats: {
        articles: author.article_count,
        followers: author.follower_count,
        readingHours: author.total_reads, // Mapping 'total_reads' to 'readingHours' based on UI "1820 阅读"
        weeklyCompletion: author.weekly_completion_rate,
      },
      links: author.social_links || [],
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
