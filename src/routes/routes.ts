
import { Router } from 'express';
import { LastTrainingRouter } from './lastTraining/lastTraining.router';
import { AccountRouter } from './account/account.router';
import { PingRouter } from './ping/ping.router';
import { TrainingSessionRouter } from "./trainingSession/trainingSession.router";

const router = Router();

router.use('/ping', PingRouter);
router.use('/lastTraining', LastTrainingRouter);
router.use('/account', AccountRouter);
router.use('/trainingSession', TrainingSessionRouter)

export { router as AppRouter };