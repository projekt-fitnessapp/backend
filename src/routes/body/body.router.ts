import { Router } from 'express';

import { getBody, saveBody } from './body.controller'

const router = Router();

router.get('/', getBody);
router.post('/', saveBody);

export { router as BodyRouter };