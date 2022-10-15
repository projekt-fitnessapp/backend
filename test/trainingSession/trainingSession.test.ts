import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { TrainingSession } from '../../src/schemas/training.session';
import { setupServer } from '../../src/server';
import supertest from "supertest";
import { Excercise } from '../../src/schemas/excercise';
import { Execution } from '../../src/schemas/execution';

describe('Testing the training session route', () => {

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

  test('Testing get training session with Ids', async () => {
    const excerciseId = await Excercise.create({
      "_id": "5099803df3f4948bd2f98391",
      "name": "Bench Press",
      "instruction": "Push the bar.",
      "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
      "muscle": "breast",
      "equipment": "barbell"
    })
    const executionId = await Execution.create({
      "exercise": {
        "_id": excerciseId
      },
      "notes": [
        "string"
      ],
      "sets": [
        {
          "executionType": "warmup",
          "weight": 0,
          "reps": 0,
          "tenRM": 0
        }
      ]
    })
    await TrainingSession.create({
      "_id": "5099803df3f4948bd2f98548",
      "userId": "5099803df3f494add2f9dja5",
      "trainingDayId": "5099803df3f4948bd2f9dja5",
      "date": "2016-05-18T16:30:00Z",
      "executions": [
        {"_id": executionId}
      ]
    })

    const response = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dja5&id=[5099803df3f4948bd2f98548]")

    expect(response.status).to.equal(200)
    expect(response.body).to.equal([
      {
        "__v": 0,
        "_id": "5099803df3f4948bd2f98548",
        "userId": "5099803df3f494add2f9dja5",
        "trainingDayId": "5099803df3f4948bd2f9dja5",
        "date": "2016-05-18T16:30:00Z",
        "executions": [
          {
            "exercise": {
              "_id": "5099803df3f4948bd2f98391",
              "name": "Bench Press",
              "instruction": "Push the bar.",
              "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
              "muscle": "breast",
              "equipment": "barbell"
            },
            "notes": [
              "string"
            ],
            "sets": [
              {
                "executionType": "warmup",
                "weight": 0,
                "reps": 0,
                "tenRM": 0
              }
            ]
          }
        ]
      }
    ])
  })

  test('Testing get training session without Ids', async () => {
    const excerciseId = await Excercise.create({
      "_id": "5099803df3f4948bd2f98391",
      "name": "Bench Press",
      "instruction": "Push the bar.",
      "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
      "muscle": "breast",
      "equipment": "barbell"
    })
    const executionId = await Execution.create({
      "exercise": {
        "_id": excerciseId
      },
      "notes": [
        "string"
      ],
      "sets": [
        {
          "executionType": "warmup",
          "weight": 0,
          "reps": 0,
          "tenRM": 0
        }
      ]
    })
    await TrainingSession.create({
      "_id": "5099803df3f4948bd2f98548",
      "userId": "5099803df3f494add2f9dja5",
      "trainingDayId": "5099803df3f4948bd2f9dja5",
      "date": "2016-05-18T16:30:00Z",
      "executions": [
        {"_id":executionId}
      ]
    })

    const response = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dja5")

    expect(response.status).to.equal(200)
    expect(response.body).to.equal([
      {
        "__v": 0,
        "_id": "5099803df3f4948bd2f98548",
        "userId": "5099803df3f494add2f9dja5",
        "trainingDayId": "5099803df3f4948bd2f9dja5",
        "date": "2016-05-18T16:30:00Z",
        "executions": [
          {
            "exercise": {
              "_id": "5099803df3f4948bd2f98391",
              "name": "Bench Press",
              "instruction": "Push the bar.",
              "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
              "muscle": "breast",
              "equipment": "barbell"
            },
            "notes": [
              "string"
            ],
            "sets": [
              {
                "executionType": "warmup",
                "weight": 0,
                "reps": 0,
                "tenRM": 0
              }
            ]
          }
        ]
      }
    ])
  })

  test('Testing get training session without a hit', async () => {

    const response = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dja5")

    expect(response.status).to.equal(404)
    expect(response.body).to.deep.equal([])
  })

  test('Post Method with no error', async ()=>{
    const trainingSession = {
      "_id": "5099803df3f4948bd2f98548",
      "userId": "5099803df3f494add2f9dja5",
      "trainingDayId": "5099803df3f4948bd2f9dja5",
      "date": "2016-05-18T16:30:00Z",
      "executions": [
        {"_id":"5099803df3f4948bd2f98577"}
      ]
    }

    const res = await testserver.post("/trainingSession").send(trainingSession).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const res2 = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dja5");
    expect(res2.status).to.equal(200);
  });

  test('Post Method with 400 error', async ()=>{
    const trainingSession = {
      "_id": "5099803df3f4948bd2f98548",
      "date": "2016-05-18T16:30:00Z",
      "executions": []
    }

    const res = await testserver.post("/trainingSession").send(trainingSession).set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  });
})