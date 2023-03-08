import { Request, Response } from 'express';
import { TrainingDay } from '../../schemas/training.day';

export async function getTrainingDay(req: Request, res: Response) {
  try {
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
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function saveTrainingDay(req: Request, res: Response) {
  try {
    const savedTrainingDay = await TrainingDay.create(req.body);
    if (savedTrainingDay) {
      const trainingDayId = savedTrainingDay._id;
      res.status(201);
      return res.json(trainingDayId);
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
}

export async function changeTrainingDay(req: Request, res: Response) {
  try {
    if (!req.body._id) {
      return res.status(400).send({ msg: '_id is missing' });
    }
    const resBody = await TrainingDay.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(201).send(resBody);
  } catch (error) {
    return res.status(400).send(error);
  }
}
