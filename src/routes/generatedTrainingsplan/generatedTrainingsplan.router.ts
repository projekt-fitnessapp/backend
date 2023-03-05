import { Router } from 'express';

import { generateNewTrainingsplan } from './generatedTrainingsplan.controller';

const router = Router();

router.post('/', generateNewTrainingsplan);

export { router as generateNewTrainingsplanRouter };