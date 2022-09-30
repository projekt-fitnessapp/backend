import { Router } from 'express';
import { TrainingSession } from '../../schemas/training.session';
import { formatISO, subDays } from 'date-fns';
import { TLastTraining } from '../../types/last.training.types';

const router = Router();

router.get('/', async (req, res) => {
  if (req.query.days && !isNaN(parseInt(req.query.days as string))) {
    const days = parseInt(req.query.days as string);
    const now = new Date();
    const startDate = formatISO(subDays(now, days));
    const docs = JSON.parse(
      JSON.stringify(
        await TrainingSession.find({
          date: { $gte: startDate },
        })
          .lean()
          .select('date')
          .exec()
      )
    );

    console.log(docs);

    let resBody = Array<TLastTraining>();
    for (let index = 0; index < days; index++) {
      const diff = formatISO(subDays(now, index)).split('T')[0];
      let trained = false;
      docs.forEach((element: any) => {
        const entryDate = element.date as string;
        if (entryDate.includes(diff)) {
          trained = true;
        }
      });
      resBody.push({ date: diff, trained: trained });
      trained = false;
    }

    return res.status(200).json({ data: resBody, date: startDate });
  }
  return (res.status(400).statusMessage = 'bad input parameter');
});

export { router as LastTrainingRouter };
