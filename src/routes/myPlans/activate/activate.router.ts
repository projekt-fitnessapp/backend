import { Router } from 'express';
import { setPlantoActive } from './activate.controller';

const router = Router();

router.put('/', setPlantoActive);

export { router as ActivatePlanRouter };