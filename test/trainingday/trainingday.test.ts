import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { Exercise } from '../../src/schemas/exercise';
import { TrainingDay } from '../../src/schemas/training.day';
import { setupServer } from '../../src/server';
import supertest from 'supertest';

describe('Testing the training day route', () => {
  const testdb = new TestDatabase();
  const testserver = supertest(setupServer(true));

  beforeEach(async () => {
    try {
      await testdb.initialize();
    } catch (e) {
      console.log(e);
    }
  });

  test('GET with no error', async () => {
    await Exercise.create({
      _id: '5099803df3f4948bd2f98391',
      name: 'Bench Press',
      instruction: 'Push the bar.',
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
      muscle: 'breast',
      equipment: 'barbell',
    });

    await TrainingDay.create({
      __v: 0,
      _id: '5099803df3f494add2f9d707',
      name: 'Push',
      exercises: [
        {
          _id: '5099803df3f4948bd2f98392',
          exerciseId: '5099803df3f4948bd2f98391',
          sets: 3,
          reps: 10,
        },
      ],
    });

    const response = await testserver.get(
      '/trainingDay?trainingDayId=5099803df3f494add2f9d707'
    );

    const expectedResBody = {
      _id: '5099803df3f494add2f9d707',
      name: 'Push',
      exercises: [
        {
          _id: '5099803df3f4948bd2f98392',
          exerciseId: {
            _id: '5099803df3f4948bd2f98391',
            name: 'Bench Press',
            instruction: 'Push the bar.',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
            muscle: 'breast',
            equipment: 'barbell',
            __v: 0,
          },
          sets: 3,
          reps: 10,
        },
      ],
      __v: 0,
    };

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedResBody);
  });

  test('GET with error 404', async () => {
    const response = await testserver.get(
      '/trainingDay?trainingDayId=5049803df3f4948bd2f9daa4'
    );
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ msg: 'Not found' });
  });

  test('GET with error 400', async () => {
    const response = await testserver.get('/trainingDay');
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ msg: 'trainingDayId is missing!' });
  });

  test('POST with no error', async () => {
    await Exercise.create({
      _id: '5099803df3f4948bd2f98391',
      name: 'Bench Press',
      instruction: 'Push the bar.',
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
      muscle: 'breast',
      equipment: 'barbell',
    });

    let testTrainingDay = {
      _id: '5099803df3f4948bd2f9daa5',
      name: 'Push',
      exercises: [
        {
          exerciseId: '5099803df3f4948bd2f98391',
          sets: 3,
          reps: 10,
        },
      ],
    };
    const res = await testserver.post('/trainingDay').send(testTrainingDay);
    expect(res.status).to.equal(201);

    const res2 = await testserver.get(
      '/trainingDay?trainingDayId=5099803df3f4948bd2f9daa5'
    );
    expect(res2.status).to.equal(200);
    console.log(res2.body);
    // expect(res2.body).to.equal();
  });

  test('Testing POST with error 400', async () => {
    const res = await testserver.post('/trainingDay').send('Max Mustermann');
    expect(res.status).to.equal(400);
  });

  test('Testing PUT with no error', async () => {
    await Exercise.create({
      _id: '5099803df3f4948bd2f98391',
      name: 'Bench Press',
      instruction: 'Push the bar.',
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0030.gif',
      muscle: 'breast',
      equipment: 'barbell',
    });

    const trainingDay = {
      _id: '5099803df3f4948bd2f9daa5',
      name: 'Push',
      exercises: [
        {
          exerciseId: '5099803df3f4948bd2f98391',
          sets: 3,
          reps: 10,
        },
      ],
    };

    const testTrainingDay = await TrainingDay.create(trainingDay);
    const trainingExerciseId = testTrainingDay
      .toJSON()
      .exercises[0]._id.toString();

    const expectedResBody = {
      _id: '5099803df3f4948bd2f9daa5',
      name: 'Pull',
      exercises: [
        {
          _id: trainingExerciseId,
          exerciseId: '5099803df3f4948bd2f98391',
          sets: 3,
          reps: 10,
        },
      ],
      __v: 0,
    };

    trainingDay.name = 'Pull';

    const res = await testserver.put('/trainingDay').send(trainingDay);
    expect(res.status).to.equal(201);
    expect(res.body._id).to.include(expectedResBody._id);
    expect(res.body.name).to.equal(expectedResBody.name);
    expect(res.body.exercises[0].exerciseId).to.equal(
      expectedResBody.exercises[0].exerciseId
    );
    expect(res.body.exercises[0].sets).to.equal(
      expectedResBody.exercises[0].sets
    );
    expect(res.body.exercises[0].reps).to.equal(
      expectedResBody.exercises[0].reps
    );
  });

  test('Testing PUT with error 400', async () => {
    const res = await testserver
      .put('/trainingDay')
      .send('Keine TrainingDayID');
    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ msg: '_id is missing' });
  });

  afterEach(async () => {
    await testdb.cleanup();
  });
});
