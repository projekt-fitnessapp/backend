import { Router } from "express";

import { PingRouter } from "./ping/ping.router";
import { TrainingSessionRouter } from "./trainingSession/trainingSession.router";
import { MyPlansRouter } from "./myPlans/myPlans.router";

const router = Router();

router.use("/ping", PingRouter);
router.use('/trainingSession', TrainingSessionRouter)
router.use('/myPlans', MyPlansRouter)

export { router as AppRouter };
