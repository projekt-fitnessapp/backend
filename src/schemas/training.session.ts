import mongoose, { Schema } from 'mongoose';
import { TrainingSessionDocument, TrainingSessionModel } from '../types/db/training.session.types';

const TrainingSessionSchema = new Schema({
    userId: { type: String, required: true},
    trainingDayId: { type: String, required: true},
    date: { type: String, required: true},
    executions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Execution'}]
});

export const TrainingSession = mongoose.model<TrainingSessionDocument, TrainingSessionModel>('Training Session', TrainingSessionSchema, 'training sessions');