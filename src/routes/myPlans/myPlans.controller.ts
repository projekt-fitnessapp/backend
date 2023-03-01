import { Request, Response } from 'express';
import { TrainingPlan } from '../../schemas/training.plan';

export async function getMyPlans(req: Request, res: Response) {
  try {
    if (!req.query.userId) {
      res.statusMessage = 'No User Id provided';
      return res.sendStatus(400);
    }
    const myPlanDocs = await TrainingPlan.find({
      userId: req.query.userId,
    }).populate({
      path: 'trainingDays',
      populate: { path: 'exercises.exerciseId' },
    });
    const myPlans = myPlanDocs.map((plan) => plan.toJSON());
    if (!myPlanDocs || myPlans.length == 0) {
      return res.status(200).json(myPlans);
    }

    return res.json(myPlans);
  } catch (error) {
    return res.sendStatus(500);
  }
}
