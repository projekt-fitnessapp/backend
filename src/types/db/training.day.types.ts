import { Document, Model, ObjectId } from 'mongoose';

export type TTrainingDay = {
    _id: ObjectId,
    name: string,
    exercises: {
        exerciseId: string,
        sets: number
        reps: number
    }[]
}

export type TrainingDayDocument = Document<TTrainingDay>;

export type TrainingDayModel = Model<TrainingDayDocument>;