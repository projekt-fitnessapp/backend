import { Request, Response } from 'express';
import { Account } from '../../../schemas/account';

export async function setPlantoActive(req: Request, res: Response) {
  try {
    if (!req.query.userId) {
      res.statusMessage = 'No User Id provided';
      return res.sendStatus(400);
    }

    if (!req.query.trainingPlanId) {
      res.statusMessage = 'No TrainingPlanId provided';
      return res.sendStatus(400);
    }

    const user = (
      await Account.findByIdAndUpdate(req.query.userId, {
        activePlan: req.query.trainingPlanId,
      })
    )?.toJSON();

    if (!user) {
      return res.status(400).send({ msg: 'User not found' });
    }

    const updatedUser = (await Account.findById(req.query.userId))?.toJSON();

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
}
