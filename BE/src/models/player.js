import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        team: { type: String, trim: true },
        score: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default mongoose.model('Player', playerSchema);