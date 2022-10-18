import { Router } from 'express';

import { getTrainingDay } from './trainingDay.controller';
import { saveTrainingDay } from './trainingDay.controller';
import { changeTrainingDay } from './trainingDay.controller';

const router = Router();

router.get('/', getTrainingDay);
router.post('/', saveTrainingDay);
router.put('/', changeTrainingDay);

export { router as TrainingDayRouter };