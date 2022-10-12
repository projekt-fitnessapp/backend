import { Router } from "express";

import { PingRouter } from "./ping/ping.router";
import { AccountRouter } from './account/account.router';

const router = Router();

router.use("/ping", PingRouter);
router.use('/account', AccountRouter);

export { router as AppRouter };
