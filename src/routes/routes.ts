import { Router } from 'express';
import { LastTrainingRouter } from './lastTraining/lastTraining.router';

import { PingRouter } from './ping/ping.router';

const router = Router();

router.use('/ping', PingRouter);
router.use('/lastTraining', LastTrainingRouter);

export { router as AppRouter };
