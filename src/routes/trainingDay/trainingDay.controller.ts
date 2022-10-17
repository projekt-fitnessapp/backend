import { Request, Response } from 'express';
import { TrainingDay } from '../../schemas/training.day';

export async function getTrainingDay(req: Request, res: Response) {
  if (req.query.trainingDayId) {
    const docs = await TrainingDay.findById(req.query.trainingDayId).populate(
      'exercises.exerciseId'
    );
    if (!docs) {
      return res.status(404).send({ msg: 'Not found' });
    }
    return res.json(docs);
  } else {
    return res.status(400).send({ msg: 'trainingDayId is missing!' });
  }
}

export async function saveTrainingDay(req: Request, res: Response) {
  console.log(req.body);
  try {
    const savedTrainingDay = await TrainingDay.create(req.body);
    if (savedTrainingDay) {
      const trainingDayId = savedTrainingDay._id;
      res.status(201);
      return res.json({ trainingDayId });
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(400);
    return res.send();
  }
}

export async function changeTrainingDay(req: Request, res: Response) {
  try {
    if (!req.body._id) {
      res.status(400);
      return res.send();
    }
    const filter = { _id: req.body._id };
    const resBody = await TrainingDay.findOneAndUpdate(filter, req.body, {
      new: true,
    });
    res.status(201);
    return res.send(resBody);
  } catch (error) {
    res.status(400);
    return res.send();
  }
}
