import { Router } from "express";

import { PingRouter } from "./ping/ping.router";
import { TrainingSessionRouter } from "./trainingSession/trainingSession.router";

const router = Router();

router.use("/ping", PingRouter);
router.use('/trainingSession', TrainingSessionRouter)

export { router as AppRouter };
