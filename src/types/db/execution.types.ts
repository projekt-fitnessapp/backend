import { Document, Model } from 'mongoose';
import { TExcercise } from './exercise.types';

export type TSet = {
    executionType: {type: string, enum: ['warmup', 'working', 'backoff']},
    weight: {type: number, min: 0},
    reps: {type: number, min: 0},
    tenRM: {type: number, min: 0}
}

export type TExecution = {
    exercise: TExcercise,
    notes: [string],
    sets: [TSet]
}

export type ExecutionDocument = Document<TExecution>;

export type ExecutionModel = Model<ExecutionDocument>;