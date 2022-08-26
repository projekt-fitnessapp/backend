import { Request, Response } from "express";

import { Exercise } from "../../schemas/exercise";

export async function getAllExercises(_req: Request, res: Response) {
  const result = await Exercise.find();

  res.json({
    data: result,
    count: result.length,
  });
}
