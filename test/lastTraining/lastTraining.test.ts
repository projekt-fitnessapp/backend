import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import chai, { expect } from 'chai';
import supertest from 'supertest';
import { setupServer } from '../../src/server';
import { formatISO, subDays } from '../../src/helpers/dates';
import { TrainingSession } from '../../src/schemas/training.session';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';

chai.use(deepEqualInAnyOrder);

describe('LastTraining Endpoint Tests', () => {
  const testdb = new TestDatabase();
  const testserver = supertest(setupServer(true));

  beforeEach(async () => {
    try {
      await testdb.initialize();
    } catch (e) {
      console.log(e);
    }
  });

  test('Get Method 200 w/ no day trained', async () => {
    const res = await testserver.get(
      '/lastTraining?days=7&userId=5099803df3f494add2f9dja5'
    );
    const now = Date.now();
    const notTrainedLast7Days = [];
    for (let index = 0; index < 7; index++) {
      notTrainedLast7Days.push({
        date: `${formatISO(subDays(now, index)).split('T')[0]}`,
        trained: false,
      });
    }
    expect(res.status).to.equal(200);
    expect(res.body.data).to.deep.equalInAnyOrder(notTrainedLast7Days);
  });

  test('Get Method 400 bc of negative value', async () => {
    const res = await testserver.get(
      '/lastTraining?days=-7&userId=5099803df3f494add2f9dja5'
    );
    expect(res.status).to.equal(400);
  });

  test('Get Method 400 bc of missing days value', async () => {
    const res = await testserver.get(
      '/lastTraining?userId=5099803df3f494add2f9dja5'
    );
    expect(res.status).to.equal(400);
  });

  test('Get Method 400 bc of missing userId value', async () => {
    const res = await testserver.get('/lastTraining?days=5');
    expect(res.status).to.equal(400);
  });

  test('Get Method 400 bc of missing queries', async () => {
    const res = await testserver.get('/lastTraining');
    expect(res.status).to.equal(400);
  });

  test('Get Method 200 w/ one day trained', async () => {
    const now = Date.now();

    await TrainingSession.create({
      _id: '5099803df3f4948bd2f98548',
      userId: '5099803df3f494add2f9dja5',
      trainingDayId: '5099803df3f4948bd2f9dja5',
      date: `${formatISO(now)}`,
      executions: ['5099803df3f4948bd2f98391'],
    });

    const trainedOnceLast7Days = [
      {
        date: `${formatISO(now).split('T')[0]}`,
        trained: true,
      },
    ];
    for (let index = 1; index < 7; index++) {
      trainedOnceLast7Days.push({
        date: `${formatISO(subDays(now, index)).split('T')[0]}`,
        trained: false,
      });
    }

    const res = await testserver.get(
      '/lastTraining?days=7&userId=5099803df3f494add2f9dja5'
    );
    expect(res.status).to.equal(200);
    expect(res.body.data).to.deep.equalInAnyOrder(trainedOnceLast7Days);
  });

  afterEach(async () => {
    await testdb.cleanup();
  });
});
