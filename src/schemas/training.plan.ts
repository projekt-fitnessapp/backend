import mongoose, { Schema } from 'mongoose';
import { TrainingPlanDocument, TrainingPlanModel } from '../types/db/training.plan.types';

const TrainingPlanSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    split: { type: Number, required: true },
    trainingDays: { type: [String], required: true },
    nextDay: { type: Number, required: true }
});

export const TrainingPlan = mongoose.model<TrainingPlanDocument, TrainingPlanModel>('Training Plan', TrainingPlanSchema, 'training plans');