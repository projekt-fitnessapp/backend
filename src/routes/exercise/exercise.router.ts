import { Router } from 'express';
import { getExercise } from './exercise.controller';

const router = Router();

router.get('/', getExercise);

export { router as ExerciseRouter };