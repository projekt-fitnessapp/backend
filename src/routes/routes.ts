import { Router } from 'express';

import { AccountRouter } from './account/account.router';

const router = Router();

router.use('/account', AccountRouter);

export { router as AppRouter };