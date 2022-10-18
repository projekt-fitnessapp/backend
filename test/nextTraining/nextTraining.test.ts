import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import chai, { expect } from 'chai';
import supertest from 'supertest';
import { setupServer } from '../../src/server';

import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import { TrainingDay } from '../../src/schemas/training.day';
import { TrainingPlan } from '../../src/schemas/training.plan';
import { Account } from '../../src/schemas/account';
import { Exercise } from '../../src/schemas/exercise';

chai.use(deepEqualInAnyOrder);

describe('NextTraining Endpoint Tests', () => {
  const testdb = new TestDatabase();
  const testserver = supertest(setupServer(true));

  beforeEach(async () => {
    try {
      await testdb.initialize();
    } catch (e) {
      console.log(e);
    }
  });

  test('Get Method 200', async () => {
    await Exercise.create({
      _id: '634bd04ec5fd749bb50ab88a',
      name: '45° side bend',
      instruction: ' ',
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0002.gif',
      muscle: 'abs',
      equipment: 'body weight',
    });

    await Account.create({
      _id: '634dad62663403c8063adc41',
      sex: 'male',
      birthdate: '12.12.2010',
      name: 'Max Mustermann',
      google_id: '5099803df3f494add2f9dba7',
      activePlan: '634daf6d663403c8063adc44',
      trainingPlans: ['634daf6d663403c8063adc44'],
    });

    await TrainingDay.create([
      {
        _id: '634dae75663403c8063adc43',
        name: 'Push',
        exercises: [
          {
            _id: '634db8025884101c4c97f005',
            exerciseId: '634bd04ec5fd749bb50ab88a',
            sets: 3,
            reps: 10,
            __v: 0,
          },
        ],
      },
      {
        _id: '634db13c663403c8063adc45',
        name: 'Push',
        exercises: [
          {
            _id: '634db8025884101c4c97f006',
            exerciseId: '634bd04ec5fd749bb50ab88a',
            sets: 3,
            reps: 10,
            __v: 0,
          },
        ],
      },
    ]);

    await TrainingPlan.create({
      _id: '634daf6d663403c8063adc44',
      name: 'Arnold',
      split: 6,
      trainingDays: ['634dae75663403c8063adc43', '634db13c663403c8063adc45'],
      nextDay: 0,
    });

    const res = await testserver.get(
      '/nextTraining?userId=634dad62663403c8063adc41'
    );
    const expectedBody = {
      _id: '634dae75663403c8063adc43',
      name: 'Push',
      exercises: [
        {
          _id: '634db8025884101c4c97f005',
          exerciseId: {
            _id: '634bd04ec5fd749bb50ab88a',
            name: '45° side bend',
            instruction: ' ',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0002.gif',
            muscle: 'abs',
            equipment: 'body weight',
            __v: 0,
          },
          sets: 3,
          reps: 10,
        },
      ],
      __v: 0,
    };

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equalInAnyOrder(expectedBody);
  });

  test('Get Method 400 bc of missing userId', async () => {
    const res = await testserver.get('/nextTraining');
    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ msg: 'UserId missing!' });
  });

  test('Get Method 400 bc no plan active', async () => {
    await Exercise.create({
      _id: '634bd04ec5fd749bb50ab88a',
      name: '45° side bend',
      instruction: ' ',
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0002.gif',
      muscle: 'abs',
      equipment: 'body weight',
    });

    await Account.create({
      _id: '634dad62663403c8063adc41',
      sex: 'male',
      birthdate: '12.12.2010',
      name: 'Max Mustermann',
      google_id: '5099803df3f494add2f9dba7',
      trainingPlans: ['634daf6d663403c8063adc44'],
    });

    await TrainingDay.create([
      {
        _id: '634dae75663403c8063adc43',
        name: 'Push',
        exercises: [
          {
            _id: '634db8025884101c4c97f005',
            exerciseId: '634bd04ec5fd749bb50ab88a',
            sets: 3,
            reps: 10,
            __v: 0,
          },
        ],
      },
      {
        _id: '634db13c663403c8063adc45',
        name: 'Push',
        exercises: [
          {
            _id: '634db8025884101c4c97f006',
            exerciseId: '634bd04ec5fd749bb50ab88a',
            sets: 3,
            reps: 10,
            __v: 0,
          },
        ],
      },
    ]);

    await TrainingPlan.create({
      _id: '634daf6d663403c8063adc44',
      name: 'Arnold',
      split: 6,
      trainingDays: ['634dae75663403c8063adc43', '634db13c663403c8063adc45'],
      nextDay: 0,
    });

    const res = await testserver.get(
      '/nextTraining?userId=634dad62663403c8063adc41'
    );

    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ msg: 'No training plan active.' });
  });

  afterEach(async () => {
    await testdb.cleanup();
  });
});
