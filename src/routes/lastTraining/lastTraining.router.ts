import { Router } from 'express';
import { getLastTraining } from './lastTraining.controller';

const router = Router();

router.get('/', getLastTraining);

export { router as LastTrainingRouter };
