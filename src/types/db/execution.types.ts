import { Document, Model } from 'mongoose';
import { TExcercise } from './exercise.types';

export type TSet = {
    executionType: {type: string, enum: ['warmup', 'working', 'backoff']},
    weight: {type: Number, min: 0},
    reps: {type: Number, min: 0},
    tenRM: {type: Number, min: 0}
}

export type TExecution = {
    exercise: TExcercise,
    notes: [String],
    sets: [TSet]
}

export type ExecutionDocument = Document<TExecution>;

export type ExecutionModel = Model<ExecutionDocument>;