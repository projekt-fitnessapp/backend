import { TrainingSession } from "../../schemas/training.session";
import { TTrainingSession } from "../../types/db/training.session.types";

export async function getTrainingSession(
    req: { query: { userId: string, id: string[] }},
    res: {
        status: (statusCode: number) => void;
        json: (responseBody: { data: TTrainingSession[] }) => any;
        statusMessage: string;
    }
    ){
        // TODO: what if no userId?
        if(req.query.id.length === 0){

            const docs = JSON.parse(
                JSON.stringify(
                    await TrainingSession.find({
                        userId: req.query.userId
                    })
                )
            );

            res.status(200);
            res.statusMessage = 'List of Users Trainingssessions';
            res.json({data: docs});
            return;
        }
        // TODO: what about ids?
};

export async function postTrainingSession(){};