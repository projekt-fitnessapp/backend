import { Router } from "express";

import { ExerciseRouter } from "./exercise/exercise.router";

const router = Router();

router.use("/exercises", ExerciseRouter);

export { router as AppRouter };
