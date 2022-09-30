import { Router } from "express";

import { PingRouter } from "./ping/ping.router";

const router = Router();

router.use("/ping", PingRouter);

export { router as AppRouter };
