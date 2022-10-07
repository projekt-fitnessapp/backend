import { Router } from 'express';
import { subDays } from '../../helpers/dates';
import { getLastTraining } from './lastTraining.controller';

const router = Router();

router.get('/', getLastTraining);
router.get('/a/', () => subDays(Date.now(), 10));

export { router as LastTrainingRouter };
