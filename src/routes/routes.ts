import { Router } from 'express';
import { LastTrainingRouter } from './lastTraining/lastTraining.router';
import { AccountRouter } from './account/account.router';
import { TrainingPlanRouter } from "./trainingPlan/trainingPlan.router";
import { BodyRouter } from './body/body.router';
import { ExerciseRouter } from "./exercise/exercise.router";

import { PingRouter } from './ping/ping.router';
import { TrainingSessionRouter } from "./trainingSession/trainingSession.router";
import { MyPlansRouter } from "./myPlans/myPlans.router";

const router = Router();

router.use("/ping", PingRouter);
router.use('/trainingSession', TrainingSessionRouter)
router.use('/myPlans', MyPlansRouter)
router.use('/lastTraining', LastTrainingRouter);
router.use('/account', AccountRouter);
router.use('/trainingPlan', TrainingPlanRouter)
router.use('/exercises', ExerciseRouter)
router.use('/body', BodyRouter);

export { router as AppRouter };