import { Router } from 'express';
import { getMyPlans } from './myPlans.controller';

const router = Router();

router.get('/', getMyPlans);

export { router as MyPlansRouter };