import { Router } from 'express';

import { CategoryRouter } from './category/category.router';

const router = Router();

router.use('/categories', CategoryRouter);

export { router as AppRouter };