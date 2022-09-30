import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(CLIENT_ID);

export async function getGoogleUserId(
  tokenID: string
): Promise<string | undefined> {
  const ticket = await client.verifyIdToken({
    idToken: tokenID,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  var googleUserId;
  if (payload) googleUserId = payload["sub"];
  return googleUserId;
}
