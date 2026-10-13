import { Router } from 'express';
import gameRoutes from './game.route.js';

const router = Router();

router.use('/games', gameRoutes);

export default router;
