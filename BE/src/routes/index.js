import { Router } from 'express';
import questionRoutes from './question.route.js';
import playerRoutes from './player.route.js';

const router = Router();

router.use('/questions', questionRoutes);
router.use('/players', playerRoutes);

export default router;