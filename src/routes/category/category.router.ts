import { Router } from 'express';

import { getAllCategories } from './category.controller';

const router = Router();

router.get('/', getAllCategories);

export { router as CategoryRouter };