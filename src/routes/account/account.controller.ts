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
    req: { query: { days: string } },
    res: {
      status: (statusCode: number) => void;
      json: (responseBody: { data: TLastTraining[] }) => any;
      statusMessage: string;
    }
  ) {
    if (req.query.days && !isNaN(parseInt(req.query.days as string))) {
      const days = parseInt(req.query.days as string);
      const now = Date.now();
      const startDate = formatISO(subDays(now, days));
      const docs = JSON.parse(
        JSON.stringify(
          await TrainingSession.find({
            date: { $gte: startDate },
          })
            .lean()
            .select('date')
            .exec()
        )
      );
  
      let resBody = Array<TLastTraining>();
  
      for (let index = 0; index < days; index++) {
        const dateToCheck = formatISO(subDays(now, index)).split('T')[0];
        let trained = false;
        docs.forEach((trainingSession: { _id: string; date: string }) => {
          const entryDate = trainingSession.date;
          if (entryDate.includes(dateToCheck)) {
            trained = true;
          }
        });
        resBody.push({ date: dateToCheck, trained: trained });
      }
  
      res.status(200);
      res.json({ data: resBody });
      return;
    }
    res.status(400);
    res.statusMessage = 'bad input parameter';
    return;
  }