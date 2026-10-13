import gameService from '../services/game.service.js';
import asyncHandler from '../utils/asyncHandler.js';

const ok = (res, data, status = 200) => res.status(status).json({ success: true, data });

export default {
    list: asyncHandler(async (req, res) => ok(res, await gameService.list())),
    get: asyncHandler(async (req, res) => ok(res, await gameService.get(req.params.id))),
    create: asyncHandler(async (req, res) => ok(res, await gameService.create(req.body), 201)),
    update: asyncHandler(async (req, res) => ok(res, await gameService.update(req.params.id, req.body))),
    remove: asyncHandler(async (req, res) => {
        await gameService.remove(req.params.id);
        res.json({ success: true, message: 'Deleted' });
    }),
    board: asyncHandler(async (req, res) => ok(res, await gameService.board(req.params.id))),
    revealRow: asyncHandler(async (req, res) => ok(res, await gameService.revealRow(req.params.id, req.params.rowId))),
    solveKeyword: asyncHandler(async (req, res) => ok(res, await gameService.solveKeyword(req.params.id))),
    reset: asyncHandler(async (req, res) => ok(res, await gameService.reset(req.params.id)))
};
