import { Request, Response } from 'express';
import { Body } from '../../schemas/body';

export async function getBody(req: Request, res: Response) {
  try {
    if (!req.query.userId) {
      throw new Error();
    }
    const docs = await Body.find({ userId: req.query.userId }).sort({
      date: -1,
    });
    res.status(200);
    return res.json(docs[0]);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
}

export async function saveBody(req: Request, res: Response) {
  try {
    const reqBody = req.body;
    if (reqBody._id == '') delete reqBody._id;
    const savedBody = await Body.create(req.body);

    const bodyId = savedBody._id;
    res.status(201);
    return res.json({ bodyId });
  } catch (e) {
    res.status(401);
    return res.send(e);
  }
}
