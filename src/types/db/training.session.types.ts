import mongoose, { Document, Model } from 'mongoose';

export type TTrainingSession = {
    _id: string
    userId: string,
    trainingDayId: string,
    date: string,
    executions: mongoose.Schema.Types.ObjectId[]
}

export type TrainingSessionDocument = Document<TTrainingSession>;

export type TrainingSessionModel = Model<TrainingSessionDocument>;