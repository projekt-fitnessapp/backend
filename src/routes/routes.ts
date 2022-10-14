import { Router } from "express";

import { PingRouter } from "./ping/ping.router";
import { AccountRouter } from './account/account.router';
import { BodyRouter } from './body/body.router';

const router = Router();

router.use("/ping", PingRouter);
router.use('/account', AccountRouter);
router.use('/body', BodyRouter);

export { router as AppRouter };
