import asyncHandler from '../utils/asyncHandler.js';

export const createCrudController = (service) => ({
    list: asyncHandler(async (req, res) => {
        res.json({ success: true, data: await service.list() });
    }),
    get: asyncHandler(async (req, res) => {
        res.json({ success: true, data: await service.get(req.params.id) });
    }),
    create: asyncHandler(async (req, res) => {
        res.status(201).json({ success: true, data: await service.create(req.body) });
    }),
    update: asyncHandler(async (req, res) => {
        res.json({ success: true, data: await service.update(req.params.id, req.body) });
    }),
    remove: asyncHandler(async (req, res) => {
        await service.remove(req.params.id);
        res.json({ success: true, message: 'Deleted' });
    })
});