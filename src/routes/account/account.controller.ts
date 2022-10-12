import { Request, Response } from 'express';
//import { TAccount } from '../../types/db/account.types';
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
/*
 saveAccount(
  req: { query: { reqAccount: TAccount } },
  res: {
    status: (statusCode: number) => void;
    json: (responseBody: { userId: string }) => any;
    statusMessage: string;
  }
) {

  try {
    const account: TAccount = req.query.reqAccount;
    const savedAccount: TAccount = await Account.save(account);
    const userId: string = savedAccount._id;
    res.status(201);
    res.json({ userId });
    return;
  } catch (err: any) {
    res.status(401);
    res.statusMessage = 'not authorized';
    return;
  }
}


export async function changeAccount(
  req: { query: { reqAccount: TAccount } },
  res: {
    status: (statusCode: number) => void;
    json: (responseBody: { data: TAccount }) => any;
    statusMessage: string;
  }
) {

  try {
    const userId = req.query.reqAccount._id;

    const filter = { _id: userId };
    let resBody = await Account.findOneAndUpdate(filter, req.query.reqAccount, { new: true });

    res.status(200);
    res.json({ data: resBody });
  } catch (err: any) {

    res.status(400);
    res.statusMessage = 'bad input parameter, only accounts changeable';

  }
}
*/