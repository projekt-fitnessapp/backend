import { Request, Response } from 'express';
import { TrainingPlan } from '../../schemas/training.plan';
import { TrainingDay } from '../../schemas/training.day';
import { Exercise } from '../../schemas/exercise';
import { ExerciseRouter } from '../exercise/exercise.router';
import { getExercise } from '../exercise/exercise.controller';
import { postTrainingPlan } from '../trainingPlan/trainingPlan.controller';

// export async function getAccount(req: Request, res: Response) {
//   try {
//     if (!req.query.googleId) throw Error('googleId is missing');
//     const docs = await Account.find({ google_id: req.query.googleId });

//     if (!docs || docs.length == 0) {
//       return res.status(404).json();
//     }

//     return res.status(200).json(docs);
//   } catch (e) {
//     return res.status(400).send(e);
//   }
// }

const withMachinesEquipment = [
  'body weight',
  'barbell?',
  'assisted?',
  'leverage machine',
  'sled machine',
  'upper body ergometer',
  'elliptical machine',
];

const withoutMaschinesEquipment = [
  'body weight',
  'barbell',
  'cable',
  'assisted',
  'rope',
  'dumbbell',
  'stability ball',
  'ez barbell',
  'upper body ergometer',
  'kettlebell',
  'medicine ball',
  'olympic barbell',
  'bosu ball',
  'resistance band',
  'roller',
  'wheel roller',
  'tire',
  'weighted',
];

const validMuscles = [
  'abs',
  'calves',
  'quads', //Beinstrecker
  'lats',
  'pectorals', // brust
  'glutes',
  'hamstrings', // beinbeuger
  'adductors',
  'abductors',
  'triceps',
  'cardiovascular system',
  'spine',
  'upper back',
  'biceps',
  'delts', // Schultermuskeln
  'forearms',
  'traps',
];

export async function generateNewTrainingsplan (req: Request, res: Response) {

  const queryObject: { numberOfTrainingssession?: BigInteger; trainingsStatus?: string; trainingsType?: string } =
    {};

  let exercises =  new Array<any>();
  const trainingsdays =  new Array<typeof TrainingDay>();
  const userId = req.query.userId;
  const equipment = req.query.equipment;


  // Full Body Trainingsplan (2 oder 3 Trainingssession / Woche)
  if (req.body.numberOfTraininssession == 2 || req.body.numberOfTraininssession == 3 ){
    
    // Exercises herausfiltern
    var needesMuscleses = ['pectorals', 'quads', 'delts', 'lats', 'hamstrings', 'abs'];

    needesMuscleses.forEach( (muscle) => {
      if (muscle == 'lats'){
        exercises.push(getExercisesForSpecificMuscle('', muscle, req.body.equipment, 2));
      } else{
        exercises.push(getExercisesForSpecificMuscle('', muscle, req.body.equipment, 1));
      }
    });

    console.log(exercises);

  //   //TrainingsDay erstellen
  //   let traininsDay = {
  //     "name": "Full Body Workout",
  //     "exercises": [
  //       {
  //         "exerciseId": ${employeeDept} {
  //           "_id": "string",
  //           "name": "string",
  //           "instruction": "string",
  //           "gifUrl": "string",
  //           "muscle": "string",
  //           "equipment": "string",
  //           "__v": 0
  //         },
  //         "sets": 0,
  //         "reps": 0
  //       }
  //     ]
  //   }

  //   const savdTrainingDay = await TrainingDay.create(req.body);




  //   exercises.push(getExercisesForSpecificMuscle('', 'pectorals', equipment, 1));
  //   exercises.push()
  //   // Traingsdays erstellen

  //   const savedTrainingDay = await TrainingDay.create(req.body);
  //   if (savedTrainingDay) {
  //     const trainingDayId = savedTrainingDay._id;

  //   let testTrainingDay = {
  //     _id: '5099803df3f4948bd2f9daa5',
  //     name: 'Push',
  //     exercises: [
  //       {
  //         exerciseId: '5099803df3f4948bd2f98391',
  //         sets: 3,
  //         reps: 10,
  //       },
  //     ],
  //   };
  //   const res = await testserver.post('/trainingDay').send(testTrainingDay);

  //   const reqMuscle = req.query.muscle.toString();
  //   queryObject.muscle = validMuscles.filter((muscle) =>
  //     muscle.includes(reqMuscle.toLowerCase())
  //   );
  // }

  // // 2er Split Trainingsplan (4 oder 5 Trainingssession / Woche)
  // if (req.query.numberOfTrainingssession == 4 || req.query.numberOfTrainingssession == 5 ) {
  //   const reqMuscle = req.query.muscle.toString();
  //   queryObject.muscle = validMuscles.filter((muscle) =>
  //     muscle.includes(reqMuscle.toLowerCase())
  //   )[0];
  // }

  // // 3er Split Trainingsplan (6 oder 7 Trainingssession / Woche)
  // if (req.query.numberOfTrainingssession == 6 || req.query.numberOfTrainingssession == 7 ) {
  //   const reqMuscle = req.query.muscle.toString();
  //   queryObject.muscle = validMuscles.filter((muscle) =>
  //     muscle.includes(reqMuscle.toLowerCase())
  //   )[0];
  // }
  
  // exercise._id.toString();
  //   const trainingDay = await TrainingDay.create({
  //     _id: '5099803df3f4948bd2f9dba5',
  //     name: 'Push',
  //     exercises: [
  //       {
  //         _id: exerciseId,
  //         exerciseId: exerciseId,
  //         reps: 2,
  //         sets: 3
  //       }
  //     ]
  //   });

  //   const trainingDayIds = new Array<String>()
  //   trainingsdays.forEach(function(traingsDay) {})
  //   const trainingPlan = await TrainingPlan.create({
  //     _id: '5d99802df3f4948bd2f9dba1',
  //     name: 'Arnold',
  //     split: 6,
  //     trainingDays: trainingsdays.forEach,
  //     nextDay: 2,
  //   });
  //   const trainingPlanId = trainingPlan._id.toString();


  // try {
  //   if (req.query.muscle) {
  //     const reqMuscle = req.query.muscle.toString();
  //     queryObject.muscle = validMuscles.filter((muscle) =>
  //       muscle.includes(reqMuscle.toLowerCase())
  //     )[0];
  //   }

  //   if (req.query.name) {
  //     queryObject.name = req.query.name.toString();
  //   }

  // const exercise = await ExerciseRouter.findById(req.query.trainingDayId)
  // try {
  //   const savedAccount = await Account.create(req.body);
  //   if (savedAccount) {
  //     const userId = savedAccount._id;

  //     return res.status(201).json({ userId });
  //   } else {
  //     throw new Error("Save failed");
  //   }
  // } catch (e) {
  //   return res.status(400).json(e);
  // }

  // // Trainingsplan an User anhängen
  // postTrainingPlan();

}

async function getExercisesForSpecificMuscle(name: string ,muscle: string, equipment: string, numberOfExercise: number) {
  // exercise für eine bestimmte Muskelgruppe holen
  const searchedExercise: { name?: string; muscle?: string; equipment?: string } =
    {};
  searchedExercise.name = name;
  searchedExercise.muscle = muscle;
  let finalExercises: Array<any> = new Array();
  let exercises = await Exercise.find(searchedExercise).select( '_id equipment name muscle gifUrl instruction');
  console.log(exercises);

  if (exercises.length = numberOfExercise){ //Hier wurden genau so viele Übungen für eine Muskelgruppe wie gewünscht gefunden
    return exercises;
  } 

  else if (exercises.length < numberOfExercise){ // Fall 1: equipment = withMachines --> Übungen nach bestimmtem Equipment mit Maschinen filtern
    
    let filteredExercises
    if (equipment == 'withmachines'){
      filteredExercises = exercises.filter(withMachinesFilter);
    } else{
      filteredExercises = exercises.filter(withoutMachinesFilter);
    }

    if (filteredExercises.length = numberOfExercise){ // Es wurden genügend Übungen für dieses Equipment gefunden
      return exercises;
    } 
    
    else if (filteredExercises.length > numberOfExercise){ // Es wurden mehr Übungen für dieses Equipment für diese Musklegruppe gefunden als notwendig
      var randomNumbers = [];
      while(randomNumbers.length < numberOfExercise + 1){
        var r = Math.floor(Math.random() * numberOfExercise) + 1;
        if(randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
      }
      randomNumbers.forEach(function(item){  
        finalExercises.push(exercises[item]);
      });  
      return finalExercises;
    } 

    else if (filteredExercises.length < numberOfExercise){  // Es wurden zu wenige Übungen für dieses Equipment für diese Musklegruppe gefunden wie notwendig
      finalExercises.push(filteredExercises);
      while(finalExercises.length < numberOfExercise){
        let randomNumber = Math.floor(Math.random() * exercises.length)
        if (finalExercises.includes(exercises[randomNumber])){
          finalExercises.push(filteredExercises)
        }
      }
      return finalExercises;
    }
  }
}

function withMachinesFilter(element, index, array){
  return (withMachinesEquipment.includes(element));
}

function withoutMachinesFilter(element, index, array){
  return (withoutMaschinesEquipment.includes(element));
}

}
