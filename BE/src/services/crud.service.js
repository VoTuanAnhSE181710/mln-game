import { httpError } from '../utils/httpError.js';

// Service CRUD dùng chung cho mọi model
export const createCrudService = (Model, name) => ({
    list: (filter = {}, sort = { createdAt: -1 }) => Model.find(filter).sort(sort),

    async get(id) {
        const doc = await Model.findById(id);
        if (!doc) throw httpError(404, `${name} not found`);
        return doc;
    },

    create: (data) => Model.create(data),

    async update(id, data) {
        const doc = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!doc) throw httpError(404, `${name} not found`);
        return doc;
    },

    async remove(id) {
        const doc = await Model.findByIdAndDelete(id);
        if (!doc) throw httpError(404, `${name} not found`);
        return doc;
    }
});