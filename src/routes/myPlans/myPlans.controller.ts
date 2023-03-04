import { Request, Response } from 'express';
import { Account } from '../../schemas/account';
import { TrainingPlan } from '../../schemas/training.plan';

export async function getMyPlans(req: Request, res: Response) {
  try {
    if (!req.query.userId) {
      res.statusMessage = 'No User Id provided';
      return res.sendStatus(400);
    }

    const user = (await Account.findById(req.query.userId))?.toJSON();

    if (!user) {
      return res.status(400).send('User not found');
    }

    const myPlanDocs = await TrainingPlan.find({
      _id: { $in: user.trainingPlans },
    }).populate({
      path: 'trainingDays',
      populate: { path: 'exercises.exerciseId' },
    });
    const myPlans = myPlanDocs.map((plan) => plan.toJSON());
    if (!myPlanDocs || myPlans.length == 0) {
      return res.status(200).json([]);
    }

    return res.json(myPlans);
  } catch (error) {
    return res.sendStatus(500);
  }
}
