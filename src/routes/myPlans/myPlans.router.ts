import { Router } from 'express';
import { ActivatePlanRouter } from './activate/activate.router';
import { getMyPlans } from './myPlans.controller';

const router = Router();

router.get('/', getMyPlans);
router.use("/activate", ActivatePlanRouter)

export { router as MyPlansRouter };