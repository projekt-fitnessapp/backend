import { Document, Model } from 'mongoose';
import { TExecution } from './execution.types';

export type TTrainingSession = {
    _id: string
    userId: string,
    trainingDayId: string,
    date: string, // TODO: Oder Date?
    executions: [TExecution]
}

export type TrainingSessionDocument = Document<TTrainingSession>;

export type TrainingSessionModel = Model<TrainingSessionDocument>;