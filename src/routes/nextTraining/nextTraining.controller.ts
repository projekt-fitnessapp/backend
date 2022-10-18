import { Request, Response } from 'express';
import { Account } from '../../schemas/account';
import { TrainingDay } from '../../schemas/training.day';
import { TrainingPlan } from '../../schemas/training.plan';

export async function getNextTraining(req: Request, res: Response) {
  if (req.query.userId) {
    const accountDoc = await Account.findById(req.query.userId);
    const account = accountDoc?.toJSON();

    if (account && account != null) {
      if (account.activePlan == ' ') {
        return res.status(400).send({ msg: 'No training plan active.' });
      }
      const trainingPlanDoc = await TrainingPlan.findById(account.activePlan);
      const trainingPlan = trainingPlanDoc?.toJSON();

      if (trainingPlan && trainingPlan != null) {
        const nextTrainingDayId =
          trainingPlan.trainingDays[trainingPlan.nextDay];
        const trainingDayDoc = await TrainingDay.findById(
          nextTrainingDayId
        ).populate('exercises.exerciseId');
        const trainingDay = trainingDayDoc?.toJSON();
        return res.send(trainingDay);
      }
    }
  }
  return res.status(400).send({ msg: 'UserId missing!' });
}
