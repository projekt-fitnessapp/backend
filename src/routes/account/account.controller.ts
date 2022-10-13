import { Request, Response } from 'express';
import { Account } from '../../schemas/account';
import { TAccount } from '../../types/db/account.types';

export async function getAccount(
  req: Request,
  res: Response
) {
  try{
    const docs =  await Account.findById(req.query.userId)
    if(!docs) {
      res.status(404);
      return res.json();
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

  try {
    const savedAccount = await Account.create(req.query.reqAccount);
    if(savedAccount) {
    const userId = savedAccount._id;
    res.status(201);
    return res.json({ userId });
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(401);
    return res.send();
  }
}

export async function changeAccount(
  req: { query: { reqAccount: TAccount } },
  res: Response
) {

  try {
    if(req.query.reqAccount == null) {
      res.status(400);
      return res.send();
    } else {
      const userId = req.query.reqAccount._id;
      const filter = { _id: userId };
      const resBody = await Account.findOneAndUpdate(filter, req.query.reqAccount, { new: true });  
      res.status(201);
      return res.json({ data: resBody });
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    return res.send();
  }
}