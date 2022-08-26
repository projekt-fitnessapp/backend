import { Document, Model } from "mongoose";

export type TExercise = {
  name: string;
  muscle_group: string;
};

export type ExerciseDocument = Document<TExercise>;

export type ExerciseModel = Model<ExerciseDocument>;
