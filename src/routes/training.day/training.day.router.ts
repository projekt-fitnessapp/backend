import { Router } from 'express';

import { getTrainingDay } from './training.day.controller';
import { saveTrainingDay } from './training.day.controller';
import { changeTrainingDay } from './training.day.controller';

const router = Router();

router.get('/', getTrainingDay);
router.post('/', saveTrainingDay);
router.put('/', changeTrainingDay);

export { router as TrainingDayRouter };