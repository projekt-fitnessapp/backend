import { Document, Model, ObjectId } from 'mongoose';

export type TExcercise = {
    _id: ObjectId,
    name: string,
    instruction: string,
    gifUrl: string,
    muscle: string,
    equipment: string
}

export type ExcerciseDocument = Document<TExcercise>;

export type ExcerciseModel = Model<ExcerciseDocument>;