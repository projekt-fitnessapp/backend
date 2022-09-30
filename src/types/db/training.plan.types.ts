import { Document, Model, ObjectId } from 'mongoose';

export type TTrainingPlan = {
    _id: ObjectId,
    name: string,
    split: {type: number, min: 1, max: 10},
    trainingDays: {type: [string], minItems: 1, maxItems: 10},
    nextDay: {type: number, min: 1, max: 10}
}

export type TrainingPlanDocument = Document<TTrainingPlan>;

export type TrainingPlanModel = Model<TrainingPlanDocument>;