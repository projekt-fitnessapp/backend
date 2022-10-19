import { Request, Response } from 'express';
import { Account } from '../../schemas/account';
import { TrainingDay } from '../../schemas/training.day';
import { TrainingPlan } from '../../schemas/training.plan';

export async function getNextTraining(req: Request, res: Response) {
  if (!req.query.userId) {
    return res.status(400).send({ msg: 'UserId missing!' });
  }
  const accountDoc = await Account.findById(req.query.userId);
  const account = accountDoc?.toJSON();

  if (!account || account == null) {
    return res.status(404).json({ msg: 'User not found' });
  }
  if (account.activePlan == ' ') {
    return res.status(400).json({ msg: 'No training plan active.' });
  }
  const trainingPlanDoc = await TrainingPlan.findById(account.activePlan);
  const trainingPlan = trainingPlanDoc?.toJSON();

  if (!trainingPlan || trainingPlan == null) {
    return res.status(404).json({ msg: 'No Trainingplan found' });
  }
  const nextTrainingDayId = trainingPlan.trainingDays[trainingPlan.nextDay];
  const trainingDayDoc = await TrainingDay.findById(nextTrainingDayId).populate(
    'exercises.exerciseId'
  );
  const trainingDay = trainingDayDoc?.toJSON();
  return res.send(trainingDay);
}
