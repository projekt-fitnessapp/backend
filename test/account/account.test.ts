import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import { setupServer } from '../../src/server';

import { Account } from '../../src/schemas/account';
import { Exercise } from '../../src/schemas/exercise';
import { TrainingDay } from '../../src/schemas/training.day';
import { TrainingPlan } from '../../src/schemas/training.plan';
import { TrainingSession } from '../../src/schemas/training.session';

describe('Account Endpoint Tests', () => {
  const testdb = new TestDatabase();
  const testserver = supertest(setupServer(true));

  beforeEach(async () => {
    try {
      await testdb.initialize();
    } catch (e) {
      console.log(e);
    }
  });

  test('Get Method with error 404', async () => {
    const res = await testserver.get(
      '/account?googleId=5099803df3f494add2f9dba8'
    );
    expect(res.status).to.equal(404);
  });

  test('Get Method with error 400', async () => {
    const res = await testserver.get('/account');
    expect(res.status).to.equal(400);
  });

  test('Get Method with no error', async () => {
    var mongoose = require('mongoose');
    var objectId = mongoose.Types.ObjectId('5099803df3f494add2f9d707');
    await Account.create({
      _id: objectId,
      sex: 'male',
      birthdate: '12.12.2010',
      name: 'Max Mustermann',
      google_id: '5099803df3f494add2f9dba7',
    });

    const res = await testserver.get(
      '/account?googleId=5099803df3f494add2f9dba7'
    );
    expect(res.status).to.equal(200);
    expect(res.body == null);
  });

  test('Post Method with no error', async () => {
    let testaccount = {
      _id: '5099803df3f494add2f9d757',
      birthdate: '12.12.2010',
      name: 'Max Mustermann',
      google_id: '5099803df3f494add2f9dba7',
    };

    const res = await testserver
      .post('/account')
      .send(testaccount)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const res2 = await testserver.get(
      '/account?googleId=5099803df3f494add2f9dba7'
    );
    expect(res2.status).to.equal(200);
  });

  test('Post Method two accuonts with same googleid', async () => {
    let testaccount: {
      _id?: string;
      birthdate: string;
      name: string;
      google_id: string;
    } = {
      _id: '5099803df3f494add2f9d757',
      birthdate: '12.12.2010',
      name: 'Max Mustermann',
      google_id: '5099803df3f494add2f9dba7',
    };

    const res = await testserver
      .post('/account')
      .send(testaccount)
      .set('Accept', 'application/json');
    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal({ userId: testaccount._id });

    delete testaccount._id;

    const res2 = await testserver
      .post('/account')
      .send(testaccount)
      .set('Accept', 'application/json');

    expect(res2.status).to.equal(201);
    expect(res2.body).to.deep.equal(res.body);
  });

  test('Post Method with 401 error', async () => {
    const res = await testserver
      .post('/account')
      .send('Max Mustermann')
      .set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  });

  test('Put Method with no error', async () => {
    let testaccount = {
      _id: '5099803df3f494add2f9d757',
      birthdate: '12.12.2010',
      name: 'Max Mustermann',
      google_id: '5099803df3f494add2f9dba7',
    };

    await testserver
      .post('/account')
      .send(testaccount)
      .set('Accept', 'application/json');

    testaccount.name = 'Maximilian Mustermann';

    const res = await testserver.put('/account').send(testaccount);
    expect(res.status).to.equal(201);

    const res2 = await testserver.get(
      '/account?googleId=5099803df3f494add2f9dba7'
    );
    expect(res2.status).to.equal(200);
  });

  test('Put Method with 400 error', async () => {
    const res = await testserver.put('/account').send('Keine UserID');
    expect(res.status).to.equal(400);
  });

  test('delete account', async () => {
    const { userId, trainingDayId, trainingPlanId, trainingSessionId } =
      await prepareAccount(testserver);

    const res = await testserver.delete(`/account?userId=${userId}`);
    expect(res.status).to.equal(200);

    const day = await TrainingDay.findById(trainingDayId);
    expect(day).to.equal(null);
    const plan = await TrainingPlan.findById(trainingPlanId);
    expect(plan).to.equal(null);
    const session = await TrainingSession.findById(trainingSessionId);
    expect(session).to.equal(null);
  });

  test('delete userId missing', async () => {
    const res = await testserver.delete('/account');
    expect(res.status).to.equal(400);
    expect(res.body).to.equal('userId is missing!');
  });

  test('delete user not found', async () => {
    const res = await testserver.delete(
      '/account?userId=5099803df3f4948bd2f98391'
    );
    expect(res.status).to.equal(400);
    expect(res.body).to.equal('User not found');
  });

  afterEach(async () => {
    await testdb.cleanup();
  });
});

async function prepareAccount(
  testserver: supertest.SuperTest<supertest.Test>
): Promise<{
  userId: String;
  trainingSessionId: String;
  trainingDayId: String;
  trainingPlanId: String;
}> {
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
        exerciseId: exerciseId,
        reps: 2,
        sets: 3,
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
  const accountPlain = {
    _id: '5099803df3f494add2f9d757',
    birthdate: '12.12.2010',
    name: 'Max Mustermann',
    google_id: '5099803df3f494add2f9dba7',
    trainingPlans: [trainingPlanId],
    activePlan: null,
    __v: 0,
  };
  const account = await Account.create(accountPlain);
  const userId = account._id.toString();

  const traingSessionId = '5099803df3f494add2f9d757';

  const trainingSession = {
    _id: traingSessionId,
    userId: '5099803df3f494add2f9d757',
    trainingDayId: trainingDayId,
    date: '2016-05-18T16:30:00Z',
    executions: [
      {
        exercise: {
          _id: '5099803df3f4948bd2f98391',
          name: 'Bench Press',
          instruction: 'Push the bar.',
          gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
          muscle: 'breast',
          equipment: 'barbell',
        },
        notes: ['string'],
        sets: [
          {
            executionType: 'warmup',
            weight: 1,
            reps: 1,
            tenRM: 1,
          },
        ],
      },
    ],
  };

  await testserver
    .post(`/trainingSession?trainingPlanId=${trainingPlanId}`)
    .send(trainingSession)
    .set('Accept', 'application/json');

  const trainingSessionId = trainingSession._id.toString();

  return {
    userId: userId,
    trainingPlanId: trainingDayId,
    trainingDayId: trainingDayId,
    trainingSessionId: trainingSessionId,
  };
}
