import { Request, Response } from 'express';
import { UpdateQuery } from 'mongoose';
import { Account } from '../../schemas/account';
import { TrainingDay } from '../../schemas/training.day';
import { TrainingPlan } from '../../schemas/training.plan';
import { TrainingDayDocument } from '../../types/db/training.day.types';

export async function getTrainingPlan(
  req: Request,
  res: Response
) {
  try{
    if(!req.query.trainingPlanId) throw new Error("No trainingPlanId provided!");
    res.status(200).json(await TrainingPlan.findById(req.query.trainingPlanId).populate({
      path: 'trainingDays',
      model: 'Training Day'
    }))
  } catch (e) {
    res.statusMessage = "No trainingPlanId provided"
    res.status(400).send()
  }
  
}

export async function postTrainingPlan(
  req: Request,
  res: Response
) {
  try {
    let id
    if(req.query.userId){
      const account = await Account.findById(req.query.userId)
      id = (await TrainingPlan.create(req.body))._id.toString()
      if (!id) {
        throw new Error("Malformed TrainingPlan");
      }
      if (account != null) {
        const filter = { _id: req.query.userId }
        const resBody = await Account.findOneAndUpdate(filter, { $push: { trainingPlans: id }}, { new: true })
        if (!resBody) {
          await TrainingPlan.findByIdAndDelete(id)
          throw new Error("Update went wrong")
        }
      } else {
        await TrainingPlan.findByIdAndDelete(id)
        throw new Error("No Account with that Id!")
      }
    } else {
      id = (await TrainingPlan.create(req.body))._id._id
    }
    res.status(201).send(id)
  } catch (e) {
    res.status(400).send()
  }
}

export async function putTrainingPlan(
  req: Request,
  res: Response
) {
  try {
    if(!req.query.trainingPlanId) throw new Error("No trainingPlanId provided!");
    if(!Array.isArray(req.body.trainingDays)){
      res.statusMessage = 'TrainingDays has to be an array!'
      res.status(400)
      return
    }
    const newTrainingDays = req.body.trainingDays
    const tDays: string[] = []
    await Promise.all(newTrainingDays.map(async (newDay: UpdateQuery<TrainingDayDocument> | undefined) => {
      if(newDay == undefined){
        res.statusMessage = 'New TrainingDay undefined'
        res.sendStatus(400)
        return
      }
      const newExercises = newDay.exercises
      newExercises.forEach((newExercise: { exerciseId: { _id: any; }; }) => {
        newExercise.exerciseId = newExercise.exerciseId._id
      });
      await TrainingDay.findOneAndUpdate({_id: newDay._id}, newDay, { upsert: true })
      tDays.push(newDay._id.toString())
    }));
    req.body.trainingDays = tDays
    const filter = {_id: req.query.trainingPlanId}

    await TrainingPlan.findOneAndUpdate(filter, req.body, {new: true})

    console.log(await TrainingPlan.findOne(filter));

    res.status(201).send(await TrainingPlan.findOne(filter).populate({
      path: 'trainingDays',
      model: 'Training Day',
      populate: {
        path: 'exercises.exerciseId'
      }
    }))
  } catch (error) {
    res.statusMessage = "No trainingPlanId provided"
    res.status(400).send()
  }
}