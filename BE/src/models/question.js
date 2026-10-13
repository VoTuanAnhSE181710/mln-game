import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
    {
        content: { type: String, required: true, trim: true },
        options: [{ type: String, trim: true }],
        correctAnswer: { type: String, required: true, trim: true },
        explanation: { type: String, trim: true },
        category: { type: String, trim: true },
        points: { type: Number, default: 10, min: 0 },
        order: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default mongoose.model('Question', questionSchema);