import { Document, Model } from 'mongoose';

export type TExercise = {
    name: string,
    instruction: string,
    gifUrl: string,
    muscle: string,
    equipment: string
}

export type ExerciseDocument = Document<TExercise>;

export type ExerciseModel = Model<ExerciseDocument>;