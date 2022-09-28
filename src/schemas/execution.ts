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
        executionType: String, // TODO: Wie bekomme ich hier ein Enum hinein?
        weight: Number, // TODO: Minimum?
        reps: Number,
        tenRM: Number // TODO: Kann so nicht heißen (10RM)
    }, required: true}
});

export const Execution = mongoose.model<ExecutionDocument, ExecutionModel>('Execution', ExecutionSchema, 'executions');