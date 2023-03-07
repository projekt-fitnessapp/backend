import { TrainingSession } from '../../schemas/training.session';
import { Execution } from '../../schemas/execution';
import { TrainingPlan } from '../../schemas/training.plan';
import { Request, Response } from 'express';
import {
  TrainingSessionDocument,
  TTrainingSession,
} from '../../types/db/training.session.types';

export async function getTrainingSession(req: Request, res: Response) {
  try {
    let trainingSessionDocs: (TrainingSessionDocument &
      Required<{ _id: TTrainingSession }>)[] = [];

    if (req.query.userId == null) {
      throw new Error('No userId provided!');
    }

    if (Array.isArray(req.query.id)) {
      const ids = req.query.id;
      trainingSessionDocs = await TrainingSession.find({
        _id: { $in: ids },
        userId: req.query.userId,
      }).populate({
        path: 'executions',
        populate: {
          path: 'exercise',
          model: 'Exercise',
        },
      });
    } else {
      trainingSessionDocs = await TrainingSession.find({
        userId: req.query.userId,
      }).populate({
        path: 'executions',
        populate: {
          path: 'exercise',
          model: 'Exercise',
        },
      });
    }
    if (trainingSessionDocs.length == 0) {
      res.status(404);
      return res.json(trainingSessionDocs);
    }
    res.status(200);
    return res.json(trainingSessionDocs);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function postTrainingSession(req: Request, res: Response) {
  try {
    if (!Array.isArray(req.body.executions)) {
      res.statusMessage = 'No executions array provided!';
      return res.sendStatus(400);
    }
    const newExecution: string[] = [];
    await Promise.all(
      req.body.executions.map(async (execution: any) => {
        execution.exercise = execution.exercise._id;
        newExecution.push((await Execution.create(execution)).toJSON()._id);
      })
    );
    req.body.executions = newExecution;
    const saved = await TrainingSession.create(req.body);
    if (saved) {
      if (req.query.trainingPlanId != undefined) {
        const trainingPlan = await TrainingPlan.findById(req.query.trainingPlanId).populate('trainingDays');
        if (trainingPlan === null) {
          res.status(202);
          res.statusMessage = 'Session saved but nextDay couldn`t be updated.';
          return res.json(saved._id._id);
        }
        const modifiedTrainingPlan = trainingPlan.toJSON();
        modifiedTrainingPlan.nextDay = (modifiedTrainingPlan.nextDay+1)%modifiedTrainingPlan.trainingDays.length;
        await TrainingPlan.findOneAndReplace(trainingPlan._id, modifiedTrainingPlan, {returnDocument: 'after'});
        res.status(201);
        res.statusMessage = 'Session saved and nextDay updated.';
        return res.json(saved._id._id);
      }
      res.status(202);
      res.statusMessage = 'Session saved but no planId was provided, so nextDay couldn`t be updated.';
      return res.json(saved._id._id);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.statusMessage =
      'Execution malformed! Exercises must contain exerciseId as _id!';
    return res.status(400).json({ msg: error });
  }
}
