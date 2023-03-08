import { TestDatabase } from '../../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { setupServer } from '../../../src/server';
import supertest from 'supertest';
import { Exercise } from '../../../src/schemas/exercise';
import { Account } from '../../../src/schemas/account';
import { TrainingDay } from '../../../src/schemas/training.day';
import { TrainingPlan } from '../../../src/schemas/training.plan';

var trainingPlanId: String;
var fullyPopulatedTrainingPlan: any;

async function prepareDBEntries(): Promise<void> {
  const exercise = {
    _id: '5099803df3f4948bd2f98391',
    name: 'Bench Press',
    instruction: 'Push the bar.',
    gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
    muscle: 'breast',
    equipment: 'barbell',
  };
  const exerciseDoc = await Exercise.create(exercise);
  const exerciseId = exerciseDoc._id.toString();
  const trainingDay: {
    _id: String;
    name: String;
    exercises: {
      _id: String;
      exerciseId: String | Object;
      sets: Number;
      reps: Number;
    }[];
  } = {
    _id: '5099803df3f4948bd2f9dba5',
    name: 'Push',
    exercises: [
      {
        _id: exerciseId,
        exerciseId,
        sets: 1,
        reps: 3,
      },
    ],
  };
  const trainingDayDoc = await TrainingDay.create(trainingDay);
  const trainingDayId = trainingDayDoc._id.toString();
  const trainingPlan: {
    _id: String;
    name: String;
    split: Number;
    trainingDays: String[] | Object[];
    nextDay: Number;
  } = {
    _id: '5d99802df3f4948bd2f9dba1',
    name: 'Arnold',
    split: 6,
    trainingDays: [trainingDayId],
    nextDay: 2,
  };
  const trainingPlanDoc = await TrainingPlan.create(trainingPlan);
  trainingPlanId = trainingPlanDoc._id.toString();
  await Account.create({
    _id: '5099803df3f494add2f9dba5',
    google_id: '110169484474386270000',
    name: 'Markus Ruehl',
    birthdate: '1972-02-22T00:00:00Z',
    sex: 'male',
    trainingPlans: [trainingPlanId],
  });
  trainingDay.exercises[0].exerciseId = exercise;
  trainingPlan.trainingDays[0] = trainingDay;
  fullyPopulatedTrainingPlan = trainingPlan;
  fullyPopulatedTrainingPlan['__v'] = 0;
  fullyPopulatedTrainingPlan.trainingDays[0]['__v'] = 0;
  fullyPopulatedTrainingPlan.trainingDays[0].exercises[0].exerciseId['__v'] = 0;
}

describe('Testing the myPlans route', () => {
  const testdb = new TestDatabase();
  const testserver = supertest(setupServer(true));

  beforeEach(async () => {
    try {
      await testdb.initialize();
    } catch (e) {
      console.log(e);
    }
    await prepareDBEntries();
  });

  afterEach(async () => {
    await testdb.cleanup();
  });

  test('Put 200', async () => {
    const expectedResponse = {
      _id: '5099803df3f494add2f9dba5',
      google_id: '110169484474386270000',
      name: 'Markus Ruehl',
      birthdate: '1972-02-22T00:00:00Z',
      sex: 'male',
      trainingPlans: [trainingPlanId],
      activePlan: trainingPlanId,
      __v: 0,
    };
    const response = await testserver.put(
      `/myPlans/active?userId=5099803df3f494add2f9dba5&trainingPlanId=${trainingPlanId}`
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedResponse);
  });

  test('Put 400, no UserId', async () => {
    const response = await testserver.put(
      `/myPlans/active?trainingPlanId=${trainingPlanId}`
    );

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ msg: 'No User Id provided' });
  });

  test('Put 400, no TrainingPlanId', async () => {
    const response = await testserver.put(
      `/myPlans/active?userId=5099803df3f494add2f9dba5`
    );

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ msg: 'No TrainingPlanId provided' });
  });

  test('Put 400, no user found', async () => {
    const response = await testserver.put(
      `/myPlans/active?userId=5099803df3f494add2f9dba6&trainingPlanId=${trainingPlanId}`
    );

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ msg: 'User not found' });
  });

  test('Put 500, error', async () => {
    const response = await testserver.put(
      `/myPlans/active?userId=5099803df3f494add2f9dba5&trainingPlanId=1`
    );

    expect(response.status).to.equal(500);
  });

  test('Get 200', async () => {
    const expectedResponse = fullyPopulatedTrainingPlan;

    await testserver.put(
      `/myPlans/active?userId=5099803df3f494add2f9dba5&trainingPlanId=${trainingPlanId}`
    );

    const response = await testserver.get(
      `/myPlans/active?userId=5099803df3f494add2f9dba5`
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedResponse);
  });

  test('Get 200, no active plan set', async () => {
    const response = await testserver.get(
      `/myPlans/active?userId=5099803df3f494add2f9dba5`
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({});
  });

  test('Get 400, UserId missing', async () => {
    const response = await testserver.get(`/myPlans/active`);

    expect(response.status).to.equal(400);
    expect(response.body).to.equal({ msg: 'No User Id provided' });
  });
});
