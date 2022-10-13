import { Router } from 'express';

import { getAccount } from './account.controller';
import { saveAccount } from './account.controller';
//import { changeAccount } from './account.controller';

const router = Router();

router.get('/', getAccount);
router.post('/', saveAccount);
/*
router.put('/', changeAccount);
*/

export { router as AccountRouter };