import mongoose, { Schema } from 'mongoose';
import { ExecutionDocument, ExecutionModel } from '../types/db/execution.types';

const ExecutionSchema = new Schema({
    exercise: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'
    },
    notes: [String],
    sets: [{
        executionType: {type: String, enum: ['warmup', 'working', 'backoff']},
        weight: {type: Number, min: 0},
        reps: {type: Number, min: 0},
        tenRM: {type: Number, min: 0}
    }]
});

export const Execution = mongoose.model<ExecutionDocument, ExecutionModel>('Execution', ExecutionSchema, 'executions');