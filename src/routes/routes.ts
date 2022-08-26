import { Router } from "express";

import { CategoryRouter } from "./category/category.router";
import { ExerciseRouter } from "./exercise/exercise.router";

const router = Router();

router.use("/categories", CategoryRouter);
router.use("/exercises", ExerciseRouter);

export { router as AppRouter };
