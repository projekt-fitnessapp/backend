import { Request, Response } from 'express';
import { TrainingPlan } from '../../schemas/training.plan';

export async function getTrainingPlan(
  req: Request,
  res: Response
) {
  try{
    if(!req.query.trainingPlanId) throw new Error("No trainingPlanId provided!");
    res.status(200).json(await TrainingPlan.findById(req.query.trainingPlanId))
  } catch (e) {
    res.status(400).send()
  }
  
}

export async function postTrainingPlan(
  req: Request,
  res: Response
) {
  try {
    let id
    if(req.query.trainingPlanId){
        req.body._id = req.query.trainingPlanId
        id = (await TrainingPlan.create(req.body))._id._id
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
    const filter = {_id: req.query.trainingPlanId}
    res.status(201).send(await TrainingPlan.findOneAndUpdate(filter, req.body, {new: true}))
  } catch (error) {
    res.status(400).send()
  }
}