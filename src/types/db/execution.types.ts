import { Document, Model } from 'mongoose';
import { TExcercise } from './exercise.types';

export type TSet = {
    executionType: String, // TODO: Wie bekomme ich hier ein Enum hinein?
    weight: Number, // TODO: Minimum?
    reps: Number,
    tenRM: Number // TODO: Kann so nicht heißen (10RM)
}

export type TExecution = {
    exercise: TExcercise,
    notes: [String],
    sets: [TSet]
}

export type ExecutionDocument = Document<TExecution>;

export type ExecutionModel = Model<ExecutionDocument>;