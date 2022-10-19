import { TrainingSession } from "../../schemas/training.session";
import { Execution } from "../../schemas/execution";
import { Request, Response } from 'express';
import { TrainingSessionDocument, TTrainingSession } from "../../types/db/training.session.types";

export async function getTrainingSession(
    req: Request,
    res: Response
    ){
        try {
            let trainingSessionDocs: (TrainingSessionDocument & Required<{ _id: TTrainingSession; }>)[] = [];

            if (req.query.userId == null) {
                throw new Error("No userId provided!")
            }

            if ( Array.isArray(req.query.id) ) {
                const ids = req.query.id
                trainingSessionDocs = await TrainingSession.find({_id: {$in: ids}, userId: req.query.userId})
                .populate({
                    path: 'executions',
                    populate: {
                        path: 'exercise',
                        model: 'Exercise'
                    }
                }) 
            } else {
                trainingSessionDocs = await TrainingSession.find({
                    userId: req.query.userId
                })
                .populate({
                    path: 'executions',
                    populate: {
                        path: 'exercise',
                        model: 'Exercise'
                    }
                })
            }
            if (trainingSessionDocs.length == 0) {
                res.status(404)
                return res.json(trainingSessionDocs)
            }
            res.status(200)
            return res.json(trainingSessionDocs)
        } catch (error) {
            return res.sendStatus(400)
        }
}

export async function postTrainingSession(
    req: Request,
    res: Response
){
    try {
        if(!Array.isArray(req.body.executions)){
            res.statusMessage = "No executions array provided!"
            return res.sendStatus(400)
        }
        let newExecution: string[] = []
        req.body.executions.forEach(async (execution: { exercise: { _id: any; }; }) => {
            execution.exercise = execution.exercise._id
            newExecution.push((await Execution.create(execution))._id.toString())
        });
        req.body.executions = newExecution
        const saved = await TrainingSession.create(req.body)
        if (saved) {
            res.status(201)
            return res.json(saved._id._id)
        } else {
            throw new Error()
        }
        
    } catch (error) {
        res.statusMessage = "Execution malformed! Exercises must contain exerciseId as _id!"
        return res.sendStatus(400)
    }
} 