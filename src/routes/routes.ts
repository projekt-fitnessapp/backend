import { Router } from 'express';
import { LastTrainingRouter } from './lastTraining/lastTraining.router';
import { AccountRouter } from './account/account.router';
import { TrainingPlanRouter } from "./trainingPlan/trainingPlan.router";
import { ExerciseRouter } from "./exercise/exercise.router";
import { PingRouter } from './ping/ping.router';



const router = Router();

router.use('/ping', PingRouter);
router.use('/lastTraining', LastTrainingRouter);
router.use('/account', AccountRouter);
router.use('/trainingPlan', TrainingPlanRouter)
router.use('/exercises', ExerciseRouter)

export { router as AppRouter };
