import { Request, Response } from "express";
import { Excercise } from "../../schemas/excercise";

const validMuscles = ["abs", "calves", 'quads', 'lats', 'pectorals', 'glutes', 'hamstrings', 'adductors',"abductors", 'triceps','cardiovascular system', 'spine', 'upper back', 'biceps', 'delts', 'forearms', 'traps'];
const validEquipment = ["body weight",'barbell', "cable", 'assisted', 'rope', 'leverage machine', 'dumbbell', "stability ball","ez barbell","sled machine","upper body ergometer","kettlebell", "medicine ball", "olympic barbell", "bosu ball", "resistance band","roller","wheel roller", "smith machine", "tire", "elliptical machine","weighted"];

export async function getExercise(req: Request, res: Response) {
  const queryObject: { name?: string; muscle?: string; equipment?: string } =
    {};

  try {
    if (req.query.muscle) {
      const reqMuscle = req.query.muscle.toString();
      validMuscles.forEach((muscle) => {
        if (muscle.includes(reqMuscle.toLowerCase())) {
          queryObject.muscle = muscle;
        }
      });
    }

    if (req.query.name) {
      queryObject.name = req.query.name.toString();
    }

    if (req.query.equipment) {
      const reqEquipment = req.query.equipment.toString();
      validEquipment.forEach((equipment) => {
        if (equipment.includes(reqEquipment.toLowerCase())) {
          queryObject.equipment = equipment;
        }
      });
    }

    const resBody = await Excercise.find(queryObject).select('_id equipment name muscle gifUrl instruction' );

    res.status(200).json(resBody);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
