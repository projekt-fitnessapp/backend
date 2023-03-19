import { Router } from 'express';

import { deleteAccount, getAccount } from './account.controller';
import { saveAccount } from './account.controller';
import { changeAccount } from './account.controller';

const router = Router();

router.get('/', getAccount);
router.post('/', saveAccount);
router.put('/', changeAccount);
router.delete('/', deleteAccount);

export { router as AccountRouter };
