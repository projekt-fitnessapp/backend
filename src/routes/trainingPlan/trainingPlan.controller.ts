import { Request, Response } from 'express';
import { Account } from '../../schemas/account';
import { TrainingPlan } from '../../schemas/training.plan';

export async function getTrainingPlan(req: Request, res: Response) {
  try {
    if (!req.query.trainingPlanId) {
      console.log(req.query.trainingPlanId);
      throw new Error('No trainingPlanId provided!');
    }
    console.log('there');
    return res
      .status(200)
      .json(
        await TrainingPlan.findById(req.query.trainingPlanId).populate(
          'trainingDays'
        )
      );
  } catch (e) {
    console.log('here');
    res.statusMessage = 'No trainingPlanId provided';
    return res.status(400).send(e);
  }
}

export async function postTrainingPlan(req: Request, res: Response) {
  try {
    let id;
    if (req.query.userId) {
      const account = await Account.findById(req.query.userId);
      id = (await TrainingPlan.create(req.body))._id.toString();
      if (!id) {
        throw new Error('Malformed TrainingPlan');
      }
      if (account != null) {
        const filter = { _id: req.query.userId };
        const resBody = await Account.findOneAndUpdate(
          filter,
          { $push: { trainingPlans: id } },
          { new: true }
        );
        if (!resBody) {
          await TrainingPlan.findByIdAndDelete(id);
          throw new Error('Update went wrong');
        }
      } else {
        await TrainingPlan.findByIdAndDelete(id);
        throw new Error('No Account with that Id!');
      }
    } else {
      id = (await TrainingPlan.create(req.body))._id._id;
    }
    res.status(201).send(id);
  } catch (e) {
    res.status(400).send();
  }
}

export async function putTrainingPlan(req: Request, res: Response) {
  try {
    if (!req.query.trainingPlanId)
      throw new Error('No trainingPlanId provided!');
    const filter = { _id: req.query.trainingPlanId };
    res
      .status(201)
      .send(
        await TrainingPlan.findOneAndUpdate(filter, req.body, { new: true })
      );
  } catch (error) {
    res.statusMessage = 'No trainingPlanId provided';
    res.status(400).send();
  }
}
