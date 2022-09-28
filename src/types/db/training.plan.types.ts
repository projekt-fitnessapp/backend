import { Document, Model, ObjectId } from 'mongoose';

export type TTrainingPlan = {
    _id: ObjectId,
    name: string,
    split: number,
    trainingDays: [string],
    nextDay: number
}

export type TrainingPlanDocument = Document<TTrainingPlan>;

export type TrainingPlanModel = Model<TrainingPlanDocument>;