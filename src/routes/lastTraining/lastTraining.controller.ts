import { TrainingSession } from '../../schemas/training.session';
import { TLastTraining } from '../../types/last.training.types';
import { formatISO, subDays } from 'date-fns';

export async function getLastTraining(
  req: { query: { days: string } },
  res: {
    status: (statusCode: number) => void;
    json: (responseBody: { data: TLastTraining[] }) => any;
    statusMessage: string;
  }
) {
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

    let resBody = Array<TLastTraining>();

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

    res.status(200);
    res.json({ data: resBody });
    return;
  }
  res.status(400);
  res.statusMessage = 'bad input parameter';
  return;
}
