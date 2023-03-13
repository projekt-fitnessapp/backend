import { Request, Response } from 'express';
import { Account } from '../../schemas/account';

export async function getAccount(req: Request, res: Response) {
  try {
    if (!req.query.googleId) throw Error('googleId is missing');
    const docs = await Account.find({ google_id: req.query.googleId });

    if (!docs || docs.length == 0) {
      return res.status(404).json();
    }

    return res.status(200).json(docs);
  } catch (e) {
    return res.status(400).send(e);
  }
}

export async function saveAccount(req: Request, res: Response) {
  try {
    const existingAccount = await Account.findOne().where({
      googleId: req.body.googleId,
    });
    if (existingAccount) {
      const userId = existingAccount._id;
    
      return res.status(201).json({ userId });
    }

    const savedAccount = await Account.create(req.body);
    if (savedAccount) {
      const userId = savedAccount._id;

      return res.status(201).json({ userId });
    } else {
      throw new Error('Save failed');
    }
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function changeAccount(req: Request, res: Response) {
  try {
    if (!req.body._id) {
      return res.status(400).send('_iId is missing!');
    }
    const userId = req.body._id;
    const filter = { _id: userId };
    const resBody = await Account.findOneAndUpdate(filter, req.body, {
      new: true,
    });

    return res.status(201).send(resBody);
  } catch (error) {
    return res.status(400).send(error);
  }
}
