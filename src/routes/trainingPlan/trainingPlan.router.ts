import { Router } from 'express';

import { getTrainingPlan } from './trainingPlan.controller';
import { postTrainingPlan } from './trainingPlan.controller';
import { putTrainingPlan } from './trainingPlan.controller';

const router = Router();

router.get('/', getTrainingPlan);
router.post('/', postTrainingPlan);
router.put('/', putTrainingPlan);

export { router as TrainingPlanRouter };