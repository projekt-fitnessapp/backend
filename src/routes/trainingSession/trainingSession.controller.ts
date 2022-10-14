import { TrainingSession } from "../../schemas/training.session";
import { Request, Response } from 'express';
import { TrainingSessionDocument, TTrainingSession } from "../../types/db/training.session.types";
import { error } from "console";

export async function getTrainingSession(
    req: Request,
    res: Response
    ){
        try {
            let trainingSessionDocs: (TrainingSessionDocument & Required<{ _id: TTrainingSession; }>)[];

            if (req.query.userId == null) {
                throw new Error("No userId provides!")
            }

            /*if (typeof req.query.id != 'string') {
                console.error();
                error
            }*/

            if (req.query.id) {
                /*if (typeof req.query.id != 'string' && req.query.id != undefined) {
                    req.query.id.forEach(async id => {

                    });
                } else {
                }*/
                trainingSessionDocs = await TrainingSession.find({
                    userId: req.query.userId,
                    _id: req.query.id
                })

            } else {
                trainingSessionDocs = await TrainingSession.find({
                    userId: req.query.userId
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
        const saved = await TrainingSession.create(req.body)
        if (saved) {
            res.status(200)
            return res.json(saved._id)
        } else {
            throw new Error()
        }
        
    } catch (error) {
        return res.sendStatus(400)
    }
}