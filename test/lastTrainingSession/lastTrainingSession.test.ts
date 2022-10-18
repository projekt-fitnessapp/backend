import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { TrainingSession } from '../../src/schemas/training.session';
import { setupServer } from '../../src/server';
import supertest from 'supertest';
import { Exercise } from '../../src/schemas/exercise';
import { Execution } from '../../src/schemas/execution';

describe('Testing lastTrainingSession', () => {
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

  test('GET 200 lastSession', async () => {
    const exercise = await Exercise.create({
      _id: '5099803df3f4948bd2f98391',
      name: 'Bench Press',
      instruction: 'Push the bar.',
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
      muscle: 'breast',
      equipment: 'barbell',
    });
    const execution1 = await Execution.create({
      _id: '634ada657b24b0184c17e935',
      exercise: exercise._id,
      notes: ['string'],
      sets: [
        {
          _id: '634ada677b24b0184c17e941',
          executionType: 'warmup',
          weight: 0,
          reps: 0,
          tenRM: 0,
        },
      ],
    });
    const execution2 = await Execution.create({
      _id: '634ada657b24b0184c17e936',
      exercise: exercise._id,
      notes: ['string'],
      sets: [
        {
          _id: '634ada677b24b0184c17e946',
          executionType: 'warmup',
          weight: 0,
          reps: 0,
          tenRM: 0,
        },
      ],
    });
    await TrainingSession.create(
      {
        _id: '5099803df3f4948bd2f98548',
        userId: '5099803df3f494add2f9dja5',
        trainingDayId: '5099803df3f4948bd2f9dja5',
        date: '2016-05-18T16:30:00Z',
        executions: [execution1._id],
      },
      {
        _id: '5099803df3f4948bd2f9854a',
        userId: '5099803df3f494add2f9dja5',
        trainingDayId: '5099803df3f4948bd2f9dja5',
        date: '2016-06-18T16:30:00Z',
        executions: [execution2._id],
      }
    );

    const response = await testserver.get(
      '/lastTrainingSession?userId=5099803df3f494add2f9dja5&trainingDayId=5099803df3f4948bd2f9dja5'
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      __v: 0,
      _id: '5099803df3f4948bd2f98548',
      userId: '5099803df3f494add2f9dja5',
      trainingDayId: '5099803df3f4948bd2f9dja5',
      date: '2016-06-18T16:30:00Z',
      executions: [
        {
          __v: 0,
          _id: '634ada657b24b0184c17e935',
          exercise: {
            __v: 0,
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
              _id: '634ada677b24b0184c17e941',
              executionType: 'warmup',
              weight: 0,
              reps: 0,
              tenRM: 0,
            },
          ],
        },
      ],
    });
  });

  test('GET 400 userId missing', async () => {
    const response = await testserver.get(
      '/lastTrainingSession?trainingDayId=5099803df3f4948bd2f9dja5'
    );
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ msg: 'userId is missing' });
  });

  test('GET 400 userId missing', async () => {
    const response = await testserver.get(
      '/lastTrainingSession?userId=5099803df3f494add2f9dja5'
    );
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ msg: 'trainingDayId is missing' });
  });

  test('GET 404 no session found', async () => {
    const response = await testserver.get(
      '/lastTrainingSession?userId=5099803df3f494add2f9dja5&trainingDayId=5099803df3f4948bd2f9dja5'
    );
    expect(response.status).to.equal(404);
  });
});
