import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { TrainingPlan } from '../../src/schemas/training.plan';
import supertest from 'supertest';
import { setupServer } from '../../src/server';
import { Exercise } from '../../src/schemas/exercise';
import { TrainingDay } from '../../src/schemas/training.day';
import { Account } from '../../src/schemas/account';

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
          _id: exerciseId,
          exerciseId: exerciseId,
          reps: 2,
          sets: 3
        }
      ]
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
          exercises: [{
            _id: exerciseId,
            exerciseId: exerciseId,
            reps: 2,
            sets: 3
          }],
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

    await Exercise.create({
      _id: '5d99802df3f4955bd2f9dba1',
      equipment: "string",
      name: "string",
      muscle: "string",
      gifUrl: "string",
      instruction: "string"
    })

    const trainingDayNew = await TrainingDay.create({
      _id: '5d99892df3f4955bd2f9dba1',
      name: "string",
      exercises: [
        {
          _id: '5d99802df4f4955bd2f9dba1',
          exerciseId: '5d99802df3f4955bd2f9dba1',
          reps: 1,
          sets: 1
        }
      ],
      "__v": 0
    })
    const trainingDayId = trainingDayNew._id.toString()

    const trainingDayNew2 = await TrainingDay.create({
      _id: '5d99892df3f4955bd2f9dba2',
      name: "string",
      exercises: [
        {
          _id: '5d99802df4f4955bd2f9dba1',
          exerciseId: '5d99802df3f4955bd2f9dba1',
          reps: 2,
          sets: 2
        }
      ],
      "__v": 0
    })
    const trainingDayId2 = trainingDayNew2._id.toString()

    await TrainingPlan.create({
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Arnold',
      split: 6,
      trainingDays: [trainingDayId, trainingDayId2],
      nextDay: 2,
    });

    const res = await testserver
      .put('/trainingPlan?trainingPlanId=5d99802df3f4948bd2f9daa1')
      .send({
        __v: 0,
        _id: '5d99802df3f4948bd2f9daa1',
        name: 'Bruno heißt jetzt anders',
        split: 6,
        trainingDays: [{
          _id: '5d99892df3f4955bd2f9dba1',
          name: "new string",
          exercises: [
            {
              _id: '5d99802df4f4955bd2f9dba1',
              exerciseId: {
                _id: '5d99802df3f4955bd2f9dba1',
                __v: 0,
                equipment: "string",
                name: "string",
                muscle: "string",
                gifUrl: "string",
                instruction: "string"
              },
              reps: 1,
              sets: 2
            }
          ],
          "__v": 0
        },
        {
          _id: '5d99892df3f4955bd2f9dba2',
          name: "string",
          exercises: [
            {
              _id: '5d99802df4f4955bd2f9dba1',
              exerciseId: '5d99802df3f4955bd2f9dba1',
              reps: 2,
              sets: 2
            }
          ],
          "__v": 0
        }],
        nextDay: 3,
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal({
      __v: 0,
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Bruno heißt jetzt anders',
      split: 6,
      trainingDays: [{
        _id: '5d99892df3f4955bd2f9dba1',
        name: "new string",
        exercises: [
          {
            _id: '5d99802df4f4955bd2f9dba1',
            exerciseId: {
              __v: 0,
              _id: '5d99802df3f4955bd2f9dba1',
              equipment: "string",
              name: "string",
              muscle: "string",
              gifUrl: "string",
              instruction: "string"
            },
            reps: 1,
            sets: 2
          }
        ],
        "__v": 0
      },
      {
        _id: '5d99892df3f4955bd2f9dba2',
        name: "string",
        exercises: [
          {
            _id: '5d99802df4f4955bd2f9dba1',
            reps: 2,
            sets: 2
          }
        ],
        "__v": 0
      }],
      nextDay: 3,
    });
  })

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

  test('Post 201 with account', async () => {
    const testaccount = await Account.create({
      _id: '5099803df3f494add2f9d757',
      birthdate: "12.12.2010",
      name: "Max Mustermann",
      google_id: "5099803df3f494add2f9dba7"
      });

    const res = await testserver.post(`/trainingPlan?userId=${ testaccount._id._id }`).send({
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Bruno',
      split: 6,
      trainingDays: ['5099803df3f4948bd2f9dba5'],
      nextDay: 3,
    });

    expect(res.status).to.equal(201);
  });

  test('Post 400 malformed', async () => {

    const testaccount = await Account.create({
      _id: '5099803df3f494add2f9d757',
      birthdate: "12.12.2010",
      name: "Max Mustermann",
      google_id: "5099803df3f494add2f9dba7"
      });

    const res = await testserver.post(`/trainingPlan?userId=${ testaccount._id._id }`).send({
      random: ["random"]
    });

    expect(res.status).to.equal(400);
  });
});
