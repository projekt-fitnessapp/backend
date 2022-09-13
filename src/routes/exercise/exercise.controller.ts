import { Request, Response } from "express";

// import { Exercise } from "../../schemas/exercise";

import exerciseJson from "../../../exercises.json";
// import exerciseNinjaJson from "../../../exercises.ninja.json";

export async function getAllExercises(_req: Request, res: Response) {
  // const result = await Exercise.find();

  const result = doStuff();

  res.json({
    data: result,
    count: result.length,
  });
}

function doStuff() {
  var exerciseData = exerciseJson.data;
  // var ninjaData = exerciseNinjaJson.data;

  interface exerciseI {
    name: string;
    instruction: string;
    gifUrl: string;
    muscle: string;
    equipment: string;
  }

  var newexer: Array<exerciseI> = [];
  // var exercise: exerciseI;
  exerciseData.forEach((exercise) => {
    var exer: exerciseI = {
      name: exercise.name,
      instruction: "",
      gifUrl: exercise.gifUrl,
      muscle: exercise.target,
      equipment: exercise.equipment
    };
    newexer.push(exer);
  });

  return newexer;
}
