import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { setupServer } from '../../src/server';
import supertest from 'supertest';
import { Exercise } from '../../src/schemas/exercise';
import { Account } from '../../src/schemas/account';
import { TrainingDay } from '../../src/schemas/training.day';
import { TrainingPlan } from '../../src/schemas/training.plan';

describe('Testing the myPlans route', () => {
  const testdb = new TestDatabase();
  const testserver = supertest(setupServer(true));

  beforeEach(async () => {
    try {
      await testdb.initialize();
    } catch (e) {
      console.log(e);
    }
  });

  afterEach(async () => {
    await testdb.cleanup();
  });

  test('Get 200', async () => {
    const exercise = await Exercise.create({
      _id: '5099803df3f4948bd2f98391',
      name: 'Bench Press',
      instruction: 'Push the bar.',
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
      muscle: 'breast',
      equipment: 'barbell',
    });
    const exerciseId = exercise._id.toString();
    const trainingDay = await TrainingDay.create({
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
    });
    const trainingDayId = trainingDay._id.toString();
    const trainingPlan = await TrainingPlan.create({
      _id: '5d99802df3f4948bd2f9dba1',
      name: 'Arnold',
      split: 6,
      trainingDays: [trainingDayId],
      nextDay: 2,
    });
    const trainingPlanId = trainingPlan._id.toString();
    await Account.create({
      _id: '5099803df3f494add2f9dba5',
      google_id: '110169484474386270000',
      name: 'Markus Ruehl',
      birthdate: '1972-02-22T00:00:00Z',
      sex: 'male',
      trainingPlans: [trainingPlanId],
    });

    const expectedResponse = [
      {
        __v: 0,
        _id: trainingPlanId,
        name: 'Arnold',
        split: 6,
        trainingDays: [
          {
            __v: 0,
            _id: trainingDayId,
            name: 'Push',
            exercises: [
              {
                _id: exerciseId,
                exerciseId: {
                  _id: '5099803df3f4948bd2f98391',
                  name: 'Bench Press',
                  instruction: 'Push the bar.',
                  gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
                  muscle: 'breast',
                  equipment: 'barbell',
                  __v: 0,
                },
                reps: 3,
                sets: 1,
              },
            ],
          },
        ],
        nextDay: 2,
      },
    ];
    const response = await testserver.get(
      '/myPlans?userId=5099803df3f494add2f9dba5'
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedResponse);
  });

  test('Get 400 bc user not found', async () => {
    const exercise = await Exercise.create({
      _id: '5099803df3f4948bd2f98391',
      name: 'Bench Press',
      instruction: 'Push the bar.',
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
      muscle: 'breast',
      equipment: 'barbell',
    });
    const exerciseId = exercise._id.toString();
    const trainingDay = await TrainingDay.create({
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
    });
    const trainingDayId = trainingDay._id.toString();
    const trainingPlan = await TrainingPlan.create({
      _id: '5d99802df3f4948bd2f9dba1',
      name: 'Arnold',
      split: 6,
      trainingDays: [trainingDayId],
      nextDay: 2,
    });
    const trainingPlanId = trainingPlan._id.toString();
    await Account.create({
      _id: '5099803df3f494add2f9dba5',
      google_id: '110169484474386270000',
      name: 'Markus Ruehl',
      birthdate: '1972-02-22T00:00:00Z',
      sex: 'male',
      trainingPlans: [trainingPlanId],
    });

    const response = await testserver.get(
      '/myPlans?userId=5099803df3f494add2f9dbb5'
    );

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({msg: 'User not found'});
  });

  test('Get 400 bc of missing id', async () => {
    const res = await testserver.get('/myPlans');
    expect(res.status).to.equal(400);
  });

  test('Get 200 w/ empty arr', async () => {
    await Account.create({
      _id: '5099803df3f494add2f9dba5',
      google_id: '110169484474386270000',
      name: 'Markus Ruehl',
      birthdate: '1972-02-22T00:00:00Z',
      sex: 'male',
      trainingPlans: [],
    });

    const res = await testserver.get(
      '/myPlans?userId=5099803df3f494add2f9dba5'
    );
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([]);
  });
});
