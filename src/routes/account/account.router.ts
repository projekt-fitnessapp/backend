import { Router } from 'express';

import { getAccount } from './account.controller';
import { saveAccount } from './account.controller';

const router = Router();

router.get('/', getAccount);
router.post('/', saveAccount);

export { router as AccountRouter };