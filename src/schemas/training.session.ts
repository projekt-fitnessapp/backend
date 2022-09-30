import mongoose, { Schema } from 'mongoose';
import { TrainingSessionDocument, TrainingSessionModel } from '../types/db/training.session.types';

const TrainingSessionSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true},
    userId: { type: String, required: true},
    trainingDayId: { type: String, required: true},
    date: { type: String, required: true}, // TODO: String oder Date?
    executions: { type: [{excercise: { type: {
        _id: mongoose.Types.ObjectId,
        name: String,
        instruction: String,
        gifUrl: String,
        muscle: String,
        equipment: String
    }, required: true },
    notes: { type: [String], default: [] },
    sets: { type: {
        executionType: {type: String, enum: ['warmup', 'working', 'backoff']},
        weight: {type: Number, min: 0},
        reps: {type: Number, min: 0},
        tenRM: {type: Number, min: 0}
    }, required: true}}] }
});

export const TrainingSession = mongoose.model<TrainingSessionDocument, TrainingSessionModel>('Training Session', TrainingSessionSchema, 'training sessions');