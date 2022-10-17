import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { TrainingPlan } from '../../src/schemas/training.plan';
import supertest from 'supertest';
import { setupServer } from '../../src/server';
import { Exercise } from '../../src/schemas/exercise';
import { TrainingDay } from '../../src/schemas/training.day';

describe('Testing TrainingPlan Route', () => {
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
          exerciseId,
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

    const res = await testserver.get(
      '/trainingPlan?trainingPlanId=5d99802df3f4948bd2f9dba1'
    );

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({
      __v: 0,
      _id: trainingPlanId,
      name: 'Arnold',
      split: 6,
      trainingDays: [
        {
          __v: 0,
          _id: trainingDayId,
          name: 'Push',
          excercises: [],
        },
      ],
      nextDay: 2,
    });
  });

  test('Get 400', async () => {
    await TrainingPlan.create({
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Arnold',
      split: 6,
      trainingDays: ['5099803df3f4948bd2f9dba5'],
      nextDay: 2,
    });

    const res = await testserver.get('/trainingPlan');

    expect(res.status).to.equal(400);
  });

  test('Put 201', async () => {
    await TrainingPlan.create({
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Arnold',
      split: 6,
      trainingDays: ['5099803df3f4948bd2f9dba5'],
      nextDay: 2,
    });

    const res = await testserver
      .put('/trainingPlan?trainingPlanId=5d99802df3f4948bd2f9daa1')
      .send({
        _id: '5d99802df3f4948bd2f9daa1',
        name: 'Bruno',
        split: 6,
        trainingDays: ['5099803df3f4948bd2f9dba5'],
        nextDay: 3,
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal({
      __v: 0,
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Bruno',
      split: 6,
      trainingDays: ['5099803df3f4948bd2f9dba5'],
      nextDay: 3,
    });
  });

  test('Put 400', async () => {
    await TrainingPlan.create({
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Arnold',
      split: 6,
      trainingDays: ['5099803df3f4948bd2f9dba5'],
      nextDay: 2,
    });

    const res = await testserver.put('/trainingPlan').send({
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Bruno',
      split: 6,
      trainingDays: ['5099803df3f4948bd2f9dba5'],
      nextDay: 3,
    });

    expect(res.status).to.equal(400);
  });

  test('Post 400 without userId', async () => {
    const res = await testserver.post('/trainingPlan').send({
      name: 'Bruno',
    });

    expect(res.status).to.equal(400);
  });

  test('Post 400 with userId', async () => {
    const res = await testserver.post('/trainingPlan?userId=123').send({
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Bruno',
      split: 6,
      trainingDays: ['5099803df3f4948bd2f9dba5'],
      nextDay: 3,
    });

    expect(res.status).to.equal(400);
  });

  test('Post 201 without userId', async () => {
    const res = await testserver.post('/trainingPlan').send({
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Bruno',
      split: 6,
      trainingDays: ['5099803df3f4948bd2f9dba5'],
      nextDay: 3,
    });

    expect(res.status).to.equal(201);
  });
});
