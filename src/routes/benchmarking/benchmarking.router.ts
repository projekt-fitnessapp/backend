import { Router } from 'express';

import { getBenchmarking, saveBenchmarking } from './benchmarking.controller'

const router = Router();

router.get('/', getBenchmarking);
router.post('/', saveBenchmarking);

export { router as BenchmarkingRouter };