import mongoose, { Schema } from 'mongoose';
import { TrainingPlanDocument, TrainingPlanModel } from '../types/db/training.plan.types';

const TrainingPlanSchema = new Schema({
    name: { type: String, required: true },
    split: { type: Number, min: 1, max: 10, required: true },
    trainingDays: { type: [String], minItems: 1, maxItems: 10, required: true },
    nextDay: { type: Number, min: 0, max: 10, required: true }
});

export const TrainingPlan = mongoose.model<TrainingPlanDocument, TrainingPlanModel>('Training Plan', TrainingPlanSchema, 'training plans');