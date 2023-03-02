import { Request, Response } from 'express';
import { Benchmarking } from '../../schemas/benchmarking';

export async function getBenchmarking(req: Request, res: Response) {
  try {
    if (!req.query.userId) {
      throw new Error();
    }
    const docs = await Benchmarking.find({ userId: req.query.userId });
    res.status(200);
    return res.json(docs);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
}

export async function saveBenchmarking(req: Request, res: Response) {
  try {
    const reqBody = req.body;
    if (reqBody._id == '') delete reqBody._id;
    const savedBody = await Benchmarking.create(req.body);
    const bodyId = savedBody._id;
    res.status(201);
    return res.json({ bodyId });
  } catch (e) {
    res.status(401);
    return res.send(e);
  }
}
