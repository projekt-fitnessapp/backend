import { Router } from 'express';
import { LastTrainingRouter } from './lastTraining/lastTraining.router';
import { AccountRouter } from './account/account.router';
import { NextTrainingRouter } from './nextTraining/nextTraining.route';
import { TrainingDayRouter } from './trainingDay/trainingDay.router';
import { TrainingPlanRouter } from './trainingPlan/trainingPlan.router';
import { BodyRouter } from './body/body.router';
import { ExerciseRouter } from './exercise/exercise.router';
import { PingRouter } from './ping/ping.router';
import { TrainingSessionRouter } from './trainingSession/trainingSession.router';
import { MyPlansRouter } from './myPlans/myPlans.router';
import { LastTrainingSessionRouter } from './lastTrainingSession/lastTrainingSession.router';
import { BenchmarkingRouter } from './benchmarking/benchmarking.router';


const router = Router();

router.use('/ping', PingRouter);
router.use('/trainingSession', TrainingSessionRouter);
router.use('/myPlans', MyPlansRouter);
router.use('/lastTraining', LastTrainingRouter);
router.use('/account', AccountRouter);
router.use('/trainingPlan', TrainingPlanRouter);
router.use('/exercises', ExerciseRouter);
router.use('/body', BodyRouter);
router.use('/nextTraining', NextTrainingRouter);
router.use('/trainingDay', TrainingDayRouter);
router.use('/lastTrainingSession', LastTrainingSessionRouter);
router.use('/benchmarking', BenchmarkingRouter);

export { router as AppRouter };
