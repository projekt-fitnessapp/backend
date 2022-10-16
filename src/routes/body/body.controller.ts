import { Request, Response } from 'express';
import { Body } from '../../schemas/body';

export async function getBody(
  req: Request,
  res: Response
) {
  try{
    const docs =  await Body.findById(req.query.userId)
    res.status(200);
    return res.json(docs);
  } catch (e) {
    res.status(400);
    return res.send();
  }
}

export async function saveBody(
  req: Request,
  res: Response
) {

  try {
    const savedBody = await Body.create(req.body);
    const bodyId = savedBody._id;
    res.status(201);
    return res.json({ bodyId });
  } catch (e) {
    res.status(401);
    return res.send();
  }
}