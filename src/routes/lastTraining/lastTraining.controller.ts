import { TrainingSession } from '../../schemas/training.session';
import { TLastTraining } from '../../types/last.training.types';
import { formatISO, subDays } from '../../helpers/dates';
import { Request, Response } from 'express';

export async function getLastTraining(req: Request, res: Response) {
  if (
    req.query.days &&
    !isNaN(parseInt(req.query.days as string)) &&
    parseInt(req.query.days as string) > 0
  ) {
    const days = parseInt(req.query.days as string);
    const now = Date.now();
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

    const resBody = Array<TLastTraining>();

    for (let index = 0; index < days; index++) {
      const dateToCheck = formatISO(subDays(now, index)).split('T')[0];
      let trained = false;
      docs.forEach((trainingSession: { _id: string; date: string }) => {
        const entryDate = trainingSession.date;
        if (entryDate.includes(dateToCheck)) {
          trained = true;
        }
      });
      resBody.push({ date: dateToCheck, trained: trained });
    }

    return res.status(200).json({ data: resBody });
  }
  return res.status(400).send();
}
