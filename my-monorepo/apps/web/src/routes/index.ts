import { Router } from 'express';
import postsRouter from './posts';
import authorRouter from './author';
import tagsRouter from './tags';

const router = Router();

router.use('/posts', postsRouter);
router.use('/author', authorRouter);
router.use('/tags', tagsRouter);

export default router;
