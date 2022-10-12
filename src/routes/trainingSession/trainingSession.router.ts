import { Router } from 'express';
import { getTrainingSession, postTrainingSession } from './trainingSession.controller';

const router = Router();

router.get('/trainingSession', getTrainingSession);
router.post('/trainingSession', postTrainingSession);

export { router as TrainingSessionRouter };