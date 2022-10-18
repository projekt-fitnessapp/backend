import { Router } from 'express';
import { LastTrainingRouter } from './lastTraining/lastTraining.router';
import { AccountRouter } from './account/account.router';
import { TrainingDayRouter } from './trainingDay/trainingDay.router';
import { TrainingPlanRouter } from "./trainingPlan/trainingPlan.router";
import { BodyRouter } from './body/body.router';
import { ExerciseRouter } from './exercise/exercise.router';
import { PingRouter } from './ping/ping.router';
import { TrainingSessionRouter } from './trainingSession/trainingSession.router';
import { MyPlansRouter } from './myPlans/myPlans.router';

const router = Router();

router.use('/ping', PingRouter);
router.use('/trainingSession', TrainingSessionRouter);
router.use('/myPlans', MyPlansRouter);
router.use('/lastTraining', LastTrainingRouter);
router.use('/account', AccountRouter);
router.use('/trainingDay', TrainingDayRouter);
router.use('/body', BodyRouter);
router.use('/exercises', ExerciseRouter);
router.use('/trainingSession', TrainingSessionRouter);

export { router as AppRouter };

