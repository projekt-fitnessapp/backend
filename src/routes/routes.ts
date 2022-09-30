import { Router } from 'express';

import { PingRouter } from './ping/ping.router';
import { LastTrainingRouter } from './lastTraining/lastTraining.router';

const router = Router();

router.use('/ping', PingRouter);
router.use('/lastTraining', LastTrainingRouter);

export { router as AppRouter };
