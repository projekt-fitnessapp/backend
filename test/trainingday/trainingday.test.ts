import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { Exercise } from '../../src/schemas/excercise';
import { TrainingDay } from '../../src/schemas/training.day';
import { setupServer } from '../../src/server';
import supertest from "supertest";

describe('Testing the training day route', () => {
  const testdb = new TestDatabase()
  const testserver = supertest(setupServer(true))

  beforeEach(async () => {
    try {
      await testdb.initialize()
    } catch (e) {
      console.log(e)
    }
  })

  afterEach(async () => {
    await testdb.cleanup()
  })

  test('Testing GET with no error', async () => {

    await Exercise.create({
      _id: '5099803df3f4948bd2f98391',
      name: "Bench Press",
      instruction: "Push the bar.",
      gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
      muscle: "breast",
      equipment: "barbell"
    });

    await TrainingDay.create({
      _id: '5099803df3f494add2f9d707',
      name: "Push",
      exercises: [{
          _id: '5099803df3f4948bd2f98391',
          exerciseId: '5099803df3f4948bd2f98391',
          sets: 3,
          reps: 10,
        }]
    });

    const response = await testserver.get("/trainingDay?trainingDayId=5099803df3f494add2f9d707");

    expect(response.status).to.equal(200);
    expect(response.body._id).to.equal("5099803df3f494add2f9d707");

  })

  test('Testing GET with error 404', async () => {
    const response = await testserver.get("/trainingDay?trainingDayId=5049803df3f4948bd2f9daa4");
    expect(response.status).to.equal(404);
    expect(response.body == null);
  })

  test('Testing GET with error 400', async () => {
    const response = await testserver.get("/trainingDay?trainingDayId=f9daa4");
    expect(response.status).to.equal(400);
    expect(response.body == null);
  })

  test('Testing POST with no error', async () => {
    let testTrainingDay = {
      "_id": "5099803df3f4948bd2f9daa5",
      "name": "Push",
      "exercises": [
        {
          "exerciseId": "5099803df3f4948bd2f98391",
          "sets": 3,
          "reps": 10
        }
      ]
  }
    const res = await testserver.post("/trainingDay").send(testTrainingDay).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const res2 = await testserver.get("/trainingDay?trainingDayId=5099803df3f4948bd2f9daa5");
    expect(res2.status).to.equal(200);
  });

  test('Testing POST with error 400', async () => {
    const res = await testserver.post("/trainingDay").send("Max Mustermann").set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  })

  test('Testing PUT with no error', async () => {
    let testTrainingDay = {
      "_id": "5099803df3f4948bd2f9daa5",
      "name": "Push",
      "exercises": [
        {
          "exerciseId": "5099803df3f4948bd2f98391",
          "sets": 3,
          "reps": 10
        }
      ]
    }
    await testserver.post("/trainingDay").send(testTrainingDay).set('Accept', 'application/json');
    testTrainingDay.name = "Pull";

    const res = await testserver.put("/trainingDay").send(testTrainingDay);
    expect(res.status).to.equal(201);

    const res2 = await testserver.get("/trainingDay?trainingDayId=5099803df3f4948bd2f9daa5");
    expect(res2.status).to.equal(200);
  });

  test('Testing PUT with error 400', async () => {
    const res = await testserver.post("/trainingDay").send("Keine TrainingDayID").set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  });
})