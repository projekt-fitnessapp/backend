import { Router } from "express";

import { PingRouter } from "./ping/ping.router";
import { AccountRouter } from './account/account.router';
import { TrainingDayRouter } from "./account/training.day.router";

const router = Router();

router.use("/ping", PingRouter);
router.use('/account', AccountRouter);
router.use('/trainingDay', TrainingDayRouter);

export { router as AppRouter };
