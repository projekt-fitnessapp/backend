import { Document, Model } from 'mongoose';
import { TExcercise } from './exercise.types';

export type TSet = {
    executionType: 'warmup' | 'working' | 'backoff',
    weight: number,
    reps: number,
    tenRM: number
}

export type TExecution = {
    exercise: TExcercise,
    notes: string[],
    sets: [TSet]
}

export type ExecutionDocument = Document<TExecution>;

export type ExecutionModel = Model<ExecutionDocument>;