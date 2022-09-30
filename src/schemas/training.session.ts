import mongoose, { Schema } from 'mongoose';
import { TrainingSessionDocument, TrainingSessionModel } from '../types/db/training.session.types';

const TrainingSessionSchema = new Schema({
    userId: { type: String, required: true},
    trainingDayId: { type: String, required: true},
    date: { type: String, required: true},
    executions: [{excercise: {
        name: String,
        instruction: String,
        gifUrl: String,
        muscle: String,
        equipment: String
    },
    notes: [String],
    sets: {
        executionType: {type: String, enum: ['warmup', 'working', 'backoff']},
        weight: {type: Number, min: 0},
        reps: {type: Number, min: 0},
        tenRM: {type: Number, min: 0}
    }}]
});

export const TrainingSession = mongoose.model<TrainingSessionDocument, TrainingSessionModel>('Training Session', TrainingSessionSchema, 'training sessions');