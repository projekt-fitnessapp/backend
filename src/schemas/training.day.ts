import mongoose, { Schema } from 'mongoose';
import { TrainingDayDocument, TrainingDayModel } from '../types/db/training.day.types';

const TrainingDaySchema = new Schema({
    name: { type: String, required: true },
    exercises: [{
        exerciseId:  { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
        sets: { type: Number, min: 1, required: true },
        reps: { type: Number, min: 1, required: true }
    }]
});

export const TrainingDay = mongoose.model<TrainingDayDocument, TrainingDayModel>('Training Day', TrainingDaySchema, 'training days');