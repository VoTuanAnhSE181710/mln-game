import { Router } from 'express';
import game from '../controllers/game.controller.js';

const router = Router();

router.route('/').get(game.list).post(game.create);
router.route('/:id').get(game.get).put(game.update).delete(game.remove);

router.get('/:id/board', game.board); // FE dùng để hiển thị (không lộ đáp án chưa mở)
router.post('/:id/rows/:rowId/reveal', game.revealRow);
router.post('/:id/solve-keyword', game.solveKeyword);
router.post('/:id/reset', game.reset);

export default router;
