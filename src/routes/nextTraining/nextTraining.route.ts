import { Router } from 'express';
import { getNextTraining } from './nextTraining.controller';

const router = Router();

router.get('/', getNextTraining);

export { router as NextTrainingRouter };
