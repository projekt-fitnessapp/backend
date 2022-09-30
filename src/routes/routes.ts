import { Router } from "express";

import { CategoryRouter } from "./category/category.router";
import { PingRouter } from "./ping/ping.router";

const router = Router();

router.use("/categories", CategoryRouter);
router.use("/ping", PingRouter);

export { router as AppRouter };
