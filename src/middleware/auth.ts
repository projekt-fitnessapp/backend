import { NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(CLIENT_ID);

export async function checkAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (process.env.TEST && process.env.TEST === 'true') {
    next();
  }
  async function verify() {
    await client.verifyIdToken({
      idToken: req.headers.get('tokenID') ?? '',
      audience: CLIENT_ID,
    });
  }

  verify().then(next).catch(console.error);
}
