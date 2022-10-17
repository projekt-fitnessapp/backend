
import { Router } from 'express';
import { LastTrainingRouter } from './lastTraining/lastTraining.router';
import { AccountRouter } from './account/account.router';
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
router.use('/trainingSession', TrainingSessionRouter)
router.use('/exercises', ExerciseRouter)


export { router as AppRouter };