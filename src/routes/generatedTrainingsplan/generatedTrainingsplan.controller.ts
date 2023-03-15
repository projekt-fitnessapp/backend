import { Request, Response } from 'express';
import { TrainingDay } from '../../schemas/training.day';
import { TrainingPlan } from '../../schemas/training.plan';
import { Exercise } from '../../schemas/exercise';
import { Account } from '../../schemas/account';

const withMachinesEquipment = [
  'Machine'
];

const withoutMaschinesEquipment = [
  'Bodyweight',
  'Barbell',
  'Kettlebell',
  'Dumbbell',
  'Barbell',
  'Cable'
];

export async function generateNewTrainingsplan (req: Request, res: Response) {

  try {

    if (!req.body.user_id) throw Error('UserId is missing');
    if (!req.body.numberOfTrainingssessions) throw Error('Number of Trainingssessions is missing');
    if (!req.body.trainingsType) throw Error('Training type is missing');
    

    const numberTrainingssessions = req.body.numberOfTrainingssessions;
    const firstTrainingDayExercises = new Array<any>;
    const secondTrainingDayExercises = new Array<any>;
    const thirdTrainingDayExercises = new Array<any>;
    let nameOfTrainingPlan = 'Trainingsplan';
    const trainingsDayIds = new Array<string>;
    let nameOfTrainingDayOne = '';
    let nameOfTrainingDayTwo = '';
    let nameOfTrainingDayThree = '';
    let split = 0;

    // Full Body Trainingsplan (2 oder 3 Trainingssession / Woche)
    if (numberTrainingssessions == 2 || numberTrainingssessions == 3){

      nameOfTrainingPlan = 'Full body training plan';
      split = 1;
      nameOfTrainingDayOne = 'Full body';
      const neededMuscles = ['Brust', 'Beinstrecker', 'Schultern Trizeps', 'Latissimus', 'Rücken', 'Beinbeuger', 'Bauchmuskeln'];

      for(const muscle of neededMuscles){
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 1);
          for (let i = 0; i < ergebnis.length; i++) {
            firstTrainingDayExercises.push(ergebnis[i]);
          }}
    }

    // 2er Split Trainingsplan (4 oder 5 Trainingssession / Woche)
    if (numberTrainingssessions == 4 || numberTrainingssessions == 5){
      
      split = 2
      const typeOfSplit = Math.floor((Math.random() * 2) + 1); 

      if(typeOfSplit == 1){ //Upper and Lower Body

      nameOfTrainingDayOne = "Upper body"
      nameOfTrainingDayTwo = "Lower body"
      nameOfTrainingPlan = 'Upper / Lower Body plan';

      const upperBodyMuscles = ['Brust Trizeps Schultern', 'Latissimus', 'Rücken', 'Schultern', 'Bizeps', 'Trizeps'];
      const lowerBodyMuscles = ['Quadrizeps Hüften Gesäßmuskulatur', 'Beinbeuger', 'Waden', 'Beinstrecker', "Beinbeuger Gesäßmuskulatur Rücken", 'Bauchmuskeln'];

      for(const muscle of upperBodyMuscles){
        if (muscle == 'Brust Trizeps Schultern'){
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 2);
          for (let i = 0; i < ergebnis.length; i++) {
            firstTrainingDayExercises.push(ergebnis[i]);
          }
        }else{
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 1);
          for (let i = 0; i < ergebnis.length; i++) {
            firstTrainingDayExercises.push(ergebnis[i]);
          }}}

      for(const muscle of lowerBodyMuscles){
        if (muscle == 'Bauchmuskeln'){
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 2);
          for (let i = 0; i < ergebnis.length; i++) {
            secondTrainingDayExercises.push(ergebnis[i]);
          }
        } else{
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 1);
          for (let i = 0; i < ergebnis.length; i++) {
            secondTrainingDayExercises.push(ergebnis[i]);
          }}   
        }
      } else { //Push and Pull

      const pushMuscles = ['Brust Trizeps Schultern', 'Beinstrecker', 'Schultern', 'Quadrizeps Hüften Gesäßmuskulatur', 'Waden', 'Trizeps'];
      const pullMuscles = ['Latissimus', 'Beinbeuger', 'Rücken', "Beinbeuger Gesäßmuskulatur Rücken", 'Bizeps', 'Bauchmuskeln'];

      nameOfTrainingDayOne = "Push day"
      nameOfTrainingDayTwo = "Pull day"
      nameOfTrainingPlan = 'Push / Pull training plan';
        
      for(const muscle of pushMuscles){
        if (muscle == 'Brust Trizeps Schultern'){
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 2);
          for (let i = 0; i < ergebnis.length; i++) {
            firstTrainingDayExercises.push(ergebnis[i]);
        }
        } else {
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 1);
          for (let i = 0; i < ergebnis.length; i++) {
            firstTrainingDayExercises.push(ergebnis[i]);
          }}}

      for(const muscle of pullMuscles){
        if (muscle == 'Bauchmuskeln'){
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 2);
          for (let i = 0; i < ergebnis.length; i++) {
            secondTrainingDayExercises.push(ergebnis[i]);
          }
        } else {
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 1);
          for (let i = 0; i < ergebnis.length; i++) {
            secondTrainingDayExercises.push(ergebnis[i]);
          }}}
    }
  }

    // 3er Split Trainingsplan (6 oder 7 Trainingssession / Woche)
    if (numberTrainingssessions == 6 || numberTrainingssessions == 7){

      nameOfTrainingDayOne = "Front upper body"
      nameOfTrainingDayTwo = "Leg Day"
      nameOfTrainingDayThree = "Back and abs"
      nameOfTrainingPlan = '3 split training plan';

      split = 3
      const firstTrainingDayMuscles = ['Brust Trizeps Schultern', 'Bizeps', 'Trizeps'];
      const secondTrainingDayMuscles = ['Quadrizeps Hüften Gesäßmuskulatur', 'Beinstrecker Gesäßmuskulatur', 'Beinbeuger', 'Beinstrecker', 'Waden'];
      const thirdTrainingDayMuscles = ['Latissimus', 'Rücken', 'Schultern', 'Schultern Trizeps', 'Bauchmuskeln'];

      for(const muscle of firstTrainingDayMuscles){
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 3);
          for (let i = 0; i < ergebnis.length; i++) {
            firstTrainingDayExercises.push(ergebnis[i]);
          }}

      for(const muscle of secondTrainingDayMuscles){
        if (muscle == 'Beinstrecker' || muscle == 'Beinbeuger' || muscle == 'Waden'){
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 2);
          for (let i = 0; i < ergebnis.length; i++) {
            secondTrainingDayExercises.push(ergebnis[i]);
          }
        } else{
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 1);
          for (let i = 0; i < ergebnis.length; i++) {
            secondTrainingDayExercises.push(ergebnis[i]);
          }}  
        }  
    
      for(const muscle of thirdTrainingDayMuscles){
        if (muscle == 'Latissimus' || muscle == 'Rücken'){
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 2);
          for (let i = 0; i < ergebnis.length; i++) {
            thirdTrainingDayExercises.push(ergebnis[i]);
          }
        } else{
          const ergebnis = await getExercisesForSpecificMuscle(muscle, req.body.trainingsType, 1);
          for (let i = 0; i < ergebnis.length; i++) {
            thirdTrainingDayExercises.push(ergebnis[i]);
          }}   
      }
    }

    // Exercises den Trainingsdays zuweisen und diese erstellen

    if (firstTrainingDayExercises.length > 0){
      const exercises = new Array<any>;
      for (let i = 0; i < firstTrainingDayExercises.length; i++) {
        console.log(firstTrainingDayExercises[i])
        exercises.push({
          _id: firstTrainingDayExercises[i]._id,
          exerciseId: firstTrainingDayExercises[i]._id,
          reps: 12,
          sets: 4
        })}
      const trainingDay = await TrainingDay.create({
        name: nameOfTrainingDayOne,
        exercises: exercises
      });
      trainingsDayIds.push(trainingDay._id.toString());
    }

    if (secondTrainingDayExercises.length > 0){
      const exercises = new Array<any>;
      for (let i = 0; i < secondTrainingDayExercises.length; i++) {
        exercises.push({
          _id: secondTrainingDayExercises[i]._id,
          exerciseId: secondTrainingDayExercises[i]._id,
          reps: 12,
          sets: 4
        })}
    
      const trainingDay = await TrainingDay.create({
        name: nameOfTrainingDayTwo,
        exercises: exercises
      });
      trainingsDayIds.push(trainingDay._id.toString());
    }

    if (thirdTrainingDayExercises.length > 0){
      const exercises = new Array<any>;
      for (let i = 0; i < thirdTrainingDayExercises.length; i++) {
        exercises.push({
          _id: thirdTrainingDayExercises[i]._id,
          exerciseId: thirdTrainingDayExercises[i]._id,
          reps: 12,
          sets: 4
        })}
    
      const trainingDay = await TrainingDay.create({
        name: nameOfTrainingDayThree,
        exercises: exercises
      });
      trainingsDayIds.push(trainingDay._id.toString());
    }

    // Trainingsplan Erstellung

    const createdtrainingPlan = await TrainingPlan.create({
      name: nameOfTrainingPlan,
      split: split,
      trainingDays: trainingsDayIds,
      nextDay: 0,
    });

    const trainingPlan = await TrainingPlan.findById(createdtrainingPlan._id).populate({
      path: 'trainingDays',
      populate: { path: 'exercises.exerciseId' },
    });

    const filter = { _id: req.body.user_id };
    const resBody = await Account.findOneAndUpdate(filter, { $push: { trainingPlans: createdtrainingPlan._id.toString() }}, { new: true });
    if (resBody == null) throw Error('Number of Trainingssessions is missing');

    console.log(trainingPlan);
    return res.status(201).send(trainingPlan);

  } catch (e) {
    return res.status(400).send(e);
  }
}

  // exercise für eine bestimmte Muskelgruppe holen
async function getExercisesForSpecificMuscle(muscle: string, equipment: string, numberOfExercises: number) {
  const searchedExercise: { name?: string; muscle?: string; equipment?: string } =
    {};

  searchedExercise.muscle = muscle;

  let finalExercises: Array<any> = [];
  let filteredExercises: Array<any> = [];
  const exercises = await Exercise.find(searchedExercise).select( '_id equipment name muscle gifUrl instruction');

  // Fall 1: Es wurden genau so viele Übungen für eine Muskelgruppe wie gewünscht gefunden
  if (exercises.length <= numberOfExercises){ 
    return exercises;
  } 
  // Fall 2: Es wurden mehr Übungen für eine Muskelgruppe als gewünscht gefunden
  else if (exercises.length > numberOfExercises){ 
    if (equipment == 'withMachines'){
      filteredExercises = exercises.filter(exercise => withMachinesEquipment.includes(exercise.toJSON().equipment));
    } else{
      filteredExercises = exercises.filter(exercise => withoutMaschinesEquipment.includes(exercise.toJSON().equipment));
    }

    // Es wurden genügend Übungen für dieses Equipment gefunden
    if (filteredExercises.length == numberOfExercises){ 
      finalExercises = filteredExercises;
    } 
     // Es wurden mehr Übungen für dieses Equipment für diese Musklegruppe gefunden als notwendig --> es werden zufällig Übungen ausgesucht
    else if (filteredExercises.length > numberOfExercises){
      const randomNumbers = [];
      while(randomNumbers.length < numberOfExercises){
        const r = Math.floor((Math.random() * filteredExercises.length) + 1);
        if(randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
      }
      randomNumbers.forEach(function(item){  
        finalExercises.push(filteredExercises[item-1]);
      });  
    } 
    // Es wurden zu wenige Übungen für dieses Equipment für diese Musklegruppe gefunden wie notwendig
    else if (filteredExercises.length < numberOfExercises){  
      if (filteredExercises.length > 0){
        for (let i = 0; i < filteredExercises.length; i++) {
          finalExercises.push(filteredExercises[i]);
        }
      }
      while(finalExercises.length < numberOfExercises){
        const randomNumber = Math.floor((Math.random() * exercises.length) + 1);
        if (!finalExercises.includes(exercises[randomNumber-1])){
          finalExercises.push(exercises[randomNumber-1]);
        }
      }
    } 
  }
  return finalExercises;
}