import mongoose, { Document, Model } from 'mongoose';

export type TSet = {
    executionType: 'warmup' | 'working' | 'backoff',
    weight: number,
    reps: number,
    tenRM: number
}

export type TExecution = {
    _id: mongoose.Schema.Types.ObjectId,
    exercise: mongoose.Schema.Types.ObjectId,
    notes: string[],
    sets: TSet[]
}

export type ExecutionDocument = Document<TExecution>;

export type ExecutionModel = Model<ExecutionDocument>;