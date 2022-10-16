import { Router } from "express";

import { PingRouter } from "./ping/ping.router";
import { AccountRouter } from './account/account.router';
import { ExerciseRouter } from "./exercise/exercise.router";

const router = Router();

router.use("/ping", PingRouter);
router.use('/account', AccountRouter);
router.use('/exercises', ExerciseRouter)

export { router as AppRouter };
