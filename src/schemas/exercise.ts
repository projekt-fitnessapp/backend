import mongoose, { Schema } from "mongoose";
import { ExerciseDocument, ExerciseModel } from "../types/db/exercise.types";

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  muscle_group: { type: String, required: true },
});

export const Exercise = mongoose.model<ExerciseDocument, ExerciseModel>(
  "Exercise",
  ExerciseSchema,
  "exercises"
);
