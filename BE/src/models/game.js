import mongoose from 'mongoose';
import { normalize } from '../utils/text.js';

const rowSchema = new mongoose.Schema({
    order: { type: Number, required: true, min: 1 }, // số thứ tự hàng ngang
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    // vị trí (bắt đầu từ 1) của chữ cái nằm trong cột từ khóa, tính trên đáp án đã bỏ dấu/khoảng trắng
    keywordIndex: { type: Number, required: true, min: 1 },
    prize: { type: String, trim: true, default: '' }, // quà nhỏ
    isRevealed: { type: Boolean, default: false }
});

const gameSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        keyword: { type: String, required: true, trim: true }, // từ khóa hàng dọc
        keywordHint: { type: String, trim: true, default: '' },
        keywordPrize: { type: String, trim: true, default: '' }, // quà to
        isKeywordSolved: { type: Boolean, default: false },
        status: { type: String, enum: ['draft', 'playing', 'finished'], default: 'draft' },
        rows: [rowSchema]
    },
    { timestamps: true }
);

// Mỗi hàng ngang phải đóng góp đúng 1 chữ cái cho từ khóa
gameSchema.pre('validate', function () {
    const key = normalize(this.keyword);
    const rows = [...this.rows].sort((a, b) => a.order - b.order);

    if (key.length !== rows.length) {
        this.invalidate('rows', `Từ khóa có ${key.length} chữ cái nhưng có ${rows.length} hàng ngang`);
        return;
    }
    rows.forEach((row, i) => {
        const letter = normalize(row.answer)[row.keywordIndex - 1];
        if (letter !== key[i]) {
            this.invalidate(
                'rows',
                `Hàng ${row.order}: chữ cái thứ ${row.keywordIndex} của đáp án là "${letter ?? '?'}", cần "${key[i]}"`
            );
        }
    });
});

export default mongoose.model('Game', gameSchema);
