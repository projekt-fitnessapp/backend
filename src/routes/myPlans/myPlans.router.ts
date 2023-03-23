import { Router } from 'express';
import { ActivePlanRouter } from './active/active.router';
import { getMyPlans } from './myPlans.controller';

const router = Router();

router.get('/', getMyPlans);
router.use("/active", ActivePlanRouter)

export { router as MyPlansRouter };