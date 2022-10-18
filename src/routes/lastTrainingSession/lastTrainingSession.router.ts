import { Router } from 'express';
import { getLastTrainingSession } from './lastTrainingSession.controller';

const router = Router();

router.get('/', getLastTrainingSession);

export { router as LastTrainingSessionRouter };
