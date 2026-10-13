import Game from '../models/game.js';
import { httpError } from '../utils/httpError.js';
import { normalize } from '../utils/text.js';

const findGame = async (id) => {
    const game = await Game.findById(id);
    if (!game) throw httpError(404, 'Game not found');
    return game;
};

const findRow = (game, rowId) => {
    const row = game.rows.id(rowId);
    if (!row) throw httpError(404, 'Row not found');
    return row;
};

// Dữ liệu cho màn hình chiếu: ẩn đáp án của hàng chưa được mở, ẩn từ khóa cho tới khi có người giải
const toBoard = (game) => {
    const g = game.toObject();
    const solved = g.isKeywordSolved;
    return {
        _id: g._id,
        title: g.title,
        status: g.status,
        keywordLength: normalize(g.keyword).length,
        keywordHint: g.keywordHint,
        keywordPrize: g.keywordPrize,
        isKeywordSolved: g.isKeywordSolved,
        keyword: solved ? g.keyword : null,
        rows: [...g.rows]
            .sort((a, b) => a.order - b.order)
            .map((r) => ({
                _id: r._id,
                order: r.order,
                question: r.question,
                length: normalize(r.answer).length,
                keywordIndex: r.keywordIndex,
                prize: r.prize,
                isRevealed: r.isRevealed,
                answer: r.isRevealed ? r.answer : null
            }))
    };
};

export default {
    list: () => Game.find().select('-rows').sort({ createdAt: -1 }),
    get: findGame,
    create: (data) => Game.create(data),

    async update(id, data) {
        const game = await findGame(id);
        game.set(data);
        return game.save();
    },

    async remove(id) {
        const game = await findGame(id);
        await game.deleteOne();
    },

    async board(id) {
        return toBoard(await findGame(id));
    },

    // Mở đáp án hàng ngang sau khi có người trả lời đúng
    async revealRow(id, rowId) {
        const game = await findGame(id);
        const row = findRow(game, rowId);
        row.isRevealed = true;
        if (game.status === 'draft') game.status = 'playing';
        await game.save();
        return toBoard(game);
    },

    // Mở từ khóa hàng dọc khi có người giải ra
    async solveKeyword(id) {
        const game = await findGame(id);
        game.isKeywordSolved = true;
        game.status = 'finished';
        await game.save();
        return toBoard(game);
    },

    // Chơi lại: đóng lại tất cả hàng và từ khóa
    async reset(id) {
        const game = await findGame(id);
        game.rows.forEach((r) => {
            r.isRevealed = false;
        });
        game.isKeywordSolved = false;
        game.status = 'draft';
        await game.save();
        return toBoard(game);
    }
};
