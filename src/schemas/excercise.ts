import mongoose, { Schema } from 'mongoose';
import { ExcerciseDocument, ExcerciseModel } from '../types/db/exercise.types';

const ExcerciseSchema = new Schema({
    name: { type: String, required: true },
    instruction: { type: String, required: true },
    gifUrl: { type: String, required: true },
    muscle: { type: String, required: true },
    equipment: { type: String, required: true }
});

export const Excercise = mongoose.model<ExcerciseDocument, ExcerciseModel>('Excercise', ExcerciseSchema, 'excercises');