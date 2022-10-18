import { Request, Response } from 'express';
import { TrainingSession } from '../../schemas/training.session';

export async function getLastTrainingSession(req: Request, res: Response) {
  try {
    if (!req.query.userId) {
      return res.status(400).json({ msg: 'userId is missing' });
    }
    if (!req.query.trainingDayId) {
      return res.status(400).json({ msg: 'trainingDayId is missing' });
    }
    const userId = req.query.userId.toString();
    const trainingDayId = req.query.trainingDayId.toString();
    const lastSessionDoc = await TrainingSession.find({
      userId: userId,
      trainingDayId: trainingDayId,
    })
      .sort({ date: -1 })
      .limit(1)
      .populate({
        path: 'executions',
        populate: {
          path: 'exercise',
        },
      });
    if (!lastSessionDoc || lastSessionDoc.length == 0) {
      return res.status(404).send();
    }
    const lastSession = lastSessionDoc.map((session) => session.toJSON());
    return res.status(200).json(lastSession[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}
