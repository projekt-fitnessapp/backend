import { Request, Response } from 'express';
import { Account } from '../../schemas/account';
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
    if(req.query.userId){
      const account = await Account.findById(req.query.userId)
      id = String((await TrainingPlan.create(req.body))._id._id)
      if (!id) {
        throw new Error("Malformed TrainingPlan");
      }
      if (account != null) {
        account._id.trainingPlans.push(id)
        const filter = { _id: req.query.userId }
        const resBody = await Account.findOneAndUpdate(filter, account, { new: true })
        if (!resBody) {
          TrainingPlan.findByIdAndDelete(id)
          throw new Error("Update went wrong")
        }
      } else {
        TrainingPlan.findByIdAndDelete(id)
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
    const filter = {_id: req.query.trainingPlanId}
    res.status(201).send(await TrainingPlan.findOneAndUpdate(filter, req.body, {new: true}))
  } catch (error) {
    res.status(400).send()
  }
}