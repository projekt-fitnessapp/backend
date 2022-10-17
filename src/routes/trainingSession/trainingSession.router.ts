import { Router } from 'express';
import { getTrainingSession, postTrainingSession } from './trainingSession.controller';

const router = Router();

router.get('/', getTrainingSession);
router.post('/', postTrainingSession);

export { router as TrainingSessionRouter };