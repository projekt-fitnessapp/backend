import { Document, Model } from 'mongoose';
import {TExercise } from './exercise.types';

export type TSet = {
    executionType: 'warmup' | 'working' | 'backoff',
    weight: number,
    reps: number,
    tenRM: number
}

export type TExecution = {
    exercise: TExercise,
    notes: string[],
    sets: [TSet]
}

export type ExecutionDocument = Document<TExecution>;

export type ExecutionModel = Model<ExecutionDocument>;