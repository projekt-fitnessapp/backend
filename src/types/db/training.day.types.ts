import { Document, Model, ObjectId, Schema } from 'mongoose';

export type TTrainingDay = {
    _id: ObjectId,
    name: string,
    exercises: {
        exerciseId: Schema.Types.ObjectId,
        sets: number
        reps: number
    }[]
}

export type TrainingDayDocument = Document<TTrainingDay>;

export type TrainingDayModel = Model<TrainingDayDocument>;