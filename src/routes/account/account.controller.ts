import { ObjectID } from 'bson';
import { Request, Response } from 'express';
import { Account } from '../../schemas/account';
import { Benchmarking } from '../../schemas/benchmarking';
import { Body } from '../../schemas/body';
import { Execution } from '../../schemas/execution';
import { TrainingDay } from '../../schemas/training.day';
import { TrainingPlan } from '../../schemas/training.plan';
import { TrainingSession } from '../../schemas/training.session';

export async function getAccount(req: Request, res: Response) {
  try {
    if (!req.query.googleId) throw Error('googleId is missing');
    const docs = await Account.find({ google_id: req.query.googleId });

    if (!docs || docs.length == 0) {
      return res.status(404).json();
    }

    return res.status(200).json(docs);
  } catch (e) {
    return res.status(400).send(e);
  }
}

export async function saveAccount(req: Request, res: Response) {
  try {
    const existingAccount = await Account.findOne({
      google_id: {$eq: req.body.google_id},
    });
    if (existingAccount) {
      const userId = existingAccount._id;

      return res.status(201).json({ userId });
    }

    const savedAccount = await Account.create(req.body);
    if (savedAccount) {
      const userId = savedAccount._id;

      return res.status(201).json({ userId });
    } else {
      throw new Error('Save failed');
    }
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function changeAccount(req: Request, res: Response) {
  try {
    if (!req.body._id) {
      return res.status(400).send('_iId is missing!');
    }
    const userId = req.body._id;
    const filter = { _id: userId };
    const resBody = await Account.findOneAndUpdate(filter, req.body, {
      new: true,
    });

    return res.status(201).send(resBody);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    if (!req.query.userId) return res.status(400).json('userId is missing!');

    // find user
    const userDoc = await Account.findById(req.query.userId);
    if (!userDoc) return res.status(400).json('User not found');

    // iterate over Trainingplans and delete each (+subdocs)
    const trainingPlanIds = userDoc
      .toJSON()
      .trainingPlans.map((ids: ObjectID) => ids.toString());

    for await (const trainingPlanId of trainingPlanIds) {
      // Find trainingPlan
      const trainingPlan = await TrainingPlan.findById(trainingPlanId);
      if (!trainingPlan) return res.status(400).json('trainingPlan not found');

      // Get trainingDays
      const trainingDays = trainingPlan
        .toJSON()
        .trainingDays?.map((id: ObjectID) => id.toString());

      // Delete trainingDay Documents
      await TrainingDay.deleteMany({
        _id: { $in: trainingDays },
      });

      // Delete trainingPlan
      await TrainingPlan.findByIdAndDelete(trainingPlanId);
    }

    // find every trainingsession
    const trainingSessionDocs = await TrainingSession.find().where({
      userId: req.query.userId,
    });

    // iterate over trainingsessions and delete each (+executions)
    for await (const sessionDoc of trainingSessionDocs) {
      // Get executionIds
      const executionIds = sessionDoc
        .toJSON()
        .executions?.map((id: ObjectID) => id.toString());

      await Execution.deleteMany({ _id: { $in: executionIds } });

      // Delete TrainingSession
      await TrainingSession.findByIdAndDelete(sessionDoc._id);
    }
    // find all bodies and delete each
    await Body.deleteMany({ userId: { $eq: req.query.userId } });

    // find all benchmarkings and delete each
    await Benchmarking.deleteMany({ userId: { $eq: req.query.userId } });

    // delete account by Id
    await Account.findByIdAndDelete(req.query.userId);
    return res.send('Done');
  } catch (error) {
    return res.status(400).json(`Some error occurred: ${error}`);
  }
}
