import mongoose, { Schema } from 'mongoose';
import { TrainingDayDocument, TrainingDayModel } from '../types/db/training.day.types';

const TrainingDaySchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    excercises: { type: [{
        excerciseId: { type: String, required: true },
        sets: { type: Number, min: 1, required: true },
        reps: { type: Number, min: 1, required: true }
    }], required: true }
});

export const TrainingDay = mongoose.model<TrainingDayDocument, TrainingDayModel>('Training Day', TrainingDaySchema, 'training days');