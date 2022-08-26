import { Router } from "express";

import { getAllExercises } from "./exercise.controller";

const router = Router();

router.get("/", getAllExercises);

export { router as ExerciseRouter };
