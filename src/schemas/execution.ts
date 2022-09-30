import mongoose, { Schema } from 'mongoose';
import { ExecutionDocument, ExecutionModel } from '../types/db/execution.types';

const ExecutionSchema = new Schema({
    excercise: { type: {
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
    }, required: true}
});

export const Execution = mongoose.model<ExecutionDocument, ExecutionModel>('Execution', ExecutionSchema, 'executions');