import { Account } from "../../schemas/account";
import { Request, Response } from 'express';

export async function getMyPlans(
    req: Request,
    res: Response
    ){
        try {
            if(!req.query.userId){
                res.statusMessage = "No User Id provided"
                return res.sendStatus(400)
            }
            const account = await Account.findById(req.query.userId)
            .populate({
                path: 'trainingPlans',
                model: 'Training Plan',
                populate: {
                    path: 'trainingDays',
                    model: 'Training Day',
                    populate: {
                        path: 'exercises',
                        model: 'Exercise'
                    }
                }
            })

            if(!account){
                res.statusMessage = "No User with that Id"
                return res.sendStatus(404)
            }
            res.statusMessage = "Users TrainingPlans list"
            return res.json(account.toJSON().trainingPlans)
            
        } catch (error) {
            return res.sendStatus(400)
        }
}