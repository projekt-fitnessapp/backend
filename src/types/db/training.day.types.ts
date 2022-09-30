import { Document, Model, ObjectId } from 'mongoose';

export type TTrainingDay = {
    _id: ObjectId,
    name: string,
    excercises: [{
        excerciseId: string,
        sets: {type: number, min: 1},
        reps: {type: number, min: 1}
    }]
}

export type TrainingDayDocument = Document<TTrainingDay>;

export type TrainingDayModel = Model<TrainingDayDocument>;