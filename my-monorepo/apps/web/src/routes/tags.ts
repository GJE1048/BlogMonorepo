import express from 'express';
import { query } from '../db/neon';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await query<any>(
      `SELECT * FROM tags ORDER BY name ASC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
