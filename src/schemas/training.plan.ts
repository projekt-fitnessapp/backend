import mongoose, { Schema } from 'mongoose';
import { TrainingPlanDocument, TrainingPlanModel } from '../types/db/training.plan.types';

const TrainingPlanSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    split: { type: Number, min: 1, max: 10, required: true },
    trainingDays: { type: [String], minItems: 1, maxItems: 10, required: true },
    nextDay: { type: Number, min: 1, max: 10, required: true }
});

export const TrainingPlan = mongoose.model<TrainingPlanDocument, TrainingPlanModel>('Training Plan', TrainingPlanSchema, 'training plans');