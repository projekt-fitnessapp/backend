import { Request, Response } from 'express';
import { Account } from '../../schemas/account';

export async function getAccount(
  req: Request,
  res: Response
) {
  try{
    const docs =  await Account.findById(req.query.userId)
    if(!docs) {
      return res.status(404).json();
    }
    res.status(200);
    return res.json(docs);
  } catch (e) {
    res.status(400);
    return res.send();
  }
  
}

export async function saveAccount(
  req: Request,
  res: Response
) {

  console.log(req.body);
  try {
    const savedAccount = await Account.create(req.body);
    if(savedAccount) {
    const userId = savedAccount._id;
    res.status(201);
    return res.json({ userId });
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(400);
    return res.send();
  }
}

export async function changeAccount(
  req: Request,
  res: Response
) {

  try {
    if(!req.body._id) {
      res.status(400);
      return res.send();
    } else {
      const userId = req.body._id;
      const filter = { _id: userId };
      const resBody = await Account.findOneAndUpdate(filter, req.body, { new: true });  
      res.status(201);
      return res.send(resBody);
    }
  } catch (error) {
    res.status(400);
    return res.send();
  }
}