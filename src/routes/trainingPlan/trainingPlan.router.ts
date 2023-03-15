import { Router } from 'express';

import { getTrainingPlan } from './trainingPlan.controller';
import { postTrainingPlan } from './trainingPlan.controller';
import { putTrainingPlan } from './trainingPlan.controller';
import { deleteTrainingPlan } from './trainingPlan.controller';

const router = Router();

router.get('/', getTrainingPlan);
router.post('/', postTrainingPlan);
router.put('/', putTrainingPlan);
router.delete('/', deleteTrainingPlan)

export { router as TrainingPlanRouter };