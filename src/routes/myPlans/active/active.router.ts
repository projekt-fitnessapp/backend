import { Router } from 'express';
import { getActivePlan, setPlantoActive } from './active.controller';

const router = Router();

router.get('/', getActivePlan);
router.put('/', setPlantoActive);

export { router as ActivePlanRouter };
