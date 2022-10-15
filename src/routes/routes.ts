import { Router } from "express";

import { PingRouter } from "./ping/ping.router";
import { AccountRouter } from './account/account.router';
import { TrainingPlanRouter } from "./trainingPlan/trainingPlan.router";

const router = Router();

router.use("/ping", PingRouter);
router.use('/account', AccountRouter);
router.use('/trainingPlan', TrainingPlanRouter)

export { router as AppRouter };
