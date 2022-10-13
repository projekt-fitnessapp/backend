import { Request, Response } from 'express';
import { Account } from '../../schemas/account';

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
    console.log(e);
    return res.send();
  }
}

/*

export async function changeAccount(
  req: Request,
  res: Response
) {

  try {
    const newAccount = req.query.reqAccount;
    const userId = newAccount.google_id;

    const filter = { _id: userId };
    let resBody = await Account.findOneAndUpdate(filter, newAccount, { new: true });
    if(resBody) {
      res.status(200);
      return res.json({ data: resBody });
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(400);
    return res.send();
  }
}
*/