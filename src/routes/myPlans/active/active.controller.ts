import { Request, Response } from 'express';
import { Account } from '../../../schemas/account';

export async function setPlantoActive(req: Request, res: Response) {
  try {
    if (!req.query.userId) {
      return res.status(400).send({ msg: 'No User Id provided' });
    }

    if (!req.query.trainingPlanId) {
      return res.status(400).send({ msg: 'No TrainingPlanId provided' });
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

export async function getActivePlan(req: Request, res: Response) {
  try {
    if (!req.query.userId) {
      return res.status(400).send({ msg: 'No User Id provided' });
    }

    const activePlan = (
      await Account.findById(req.query.userId)
        .select('activePlan')
        .populate({
          path: 'activePlan',
          populate: {
            path: 'trainingDays',
            populate: { path: 'exercises', populate: 'exerciseId' },
          },
        })
    )?.toJSON();
    if (activePlan) return res.send(activePlan.activePlan);
    return res.status(200).send({});
  } catch (error) {
    return res.status(400).send(error);
  }
}
