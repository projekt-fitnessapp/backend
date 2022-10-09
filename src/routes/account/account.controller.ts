import { Request, Response } from 'express';
import { TAccount } from '../../types/db/account.types';
import { Account } from '../../schemas/account';

export async function getAccount(
    req: { query: { userId: string } },
    res: {
      status: (statusCode: number) => void;
      json: (responseBody: { data: TAccount }) => any;
      statusMessage: string;
    }
  ) {
    //Die UserID darf nicht leer sein!
    if (req.query.userId) {
      const userId = req.query.userId;
      const docs = JSON.parse(
        JSON.stringify(
          await Account.find({
            _id: { $eq: userId },
          })
            .lean()
            .select('_id')
            .exec()
        )
      );
  
      let resBody = {} as TAccount;
      if(docs) {
        resBody._id= userId;
        resBody.google_id = docs.gooogle_id;
        resBody.name = docs.name;
        resBody.birthdate = docs.birthdate; 
        resBody.sex = docs.sex;
        resBody.trainingPlans = docs.trainingPlans;
      } else {
      res.status(400);
        res.statusMessage = 'no account found!';
        return;
      }
      
      res.status(200);
      res.json({ data: resBody });
      return;
    }
    res.status(400);
    res.statusMessage = 'bad input parameter';
    return;
  }

  export async function saveAccount(
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
      const userId : string = savedAccount._id;
      res.status(201);
      res.json({ userId });
      return;
  } catch (err: any) {
      res.status(401);
      res.statusMessage = 'not authorized';
      return;
  }
}