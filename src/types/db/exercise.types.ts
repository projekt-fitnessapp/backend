import { Document, Model, ObjectId } from 'mongoose';

export type TExercise = {
    _id: ObjectId,
    name: string,
    instruction: string,
    gifUrl: string,
    muscle: string,
    equipment: string
}

export type ExerciseDocument = Document<TExercise>;

export type ExerciseModel = Model<ExerciseDocument>;