import { Router } from 'express';
import { TrainingSession } from '../../schemas/training.session';
import { formatISO, subDays } from 'date-fns';

const router = Router();

router.get('/', async (req, res) => {
  if (req.query.days && !isNaN(parseInt(req.query.days as string))) {
    const days = parseInt(req.query.days as string);
    const startDate = formatISO(subDays(new Date(), days));
    const docs = await TrainingSession.find({
      date: { $gte: startDate },
    });
    return res.status(200).json({ data: docs, date: startDate });
  }
  return (res.status(400).statusMessage = 'bad input parameter');
});

export { router as LastTrainingRouter };
