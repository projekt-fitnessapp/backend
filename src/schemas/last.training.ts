import mongoose, { Schema } from 'mongoose';
import { LastTrainingDocument, LastTrainingModel } from '../types/db/last.training.types';

const LastTrainingSchema = new Schema({
    date: { type: String, required: true }, //TODO: Oder Date?
    trained: { type: Boolean, required: true }
});

export const LastTraining = mongoose.model<LastTrainingDocument, LastTrainingModel>('Last Training', LastTrainingSchema, 'last trainings');