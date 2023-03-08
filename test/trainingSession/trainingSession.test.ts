import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { TrainingSession } from '../../src/schemas/training.session';
import { setupServer } from '../../src/server';
import supertest from "supertest";
import { Exercise } from '../../src/schemas/exercise';
import { Execution } from '../../src/schemas/execution';
import { TrainingDay } from '../../src/schemas/training.day';
import { TrainingPlan } from '../../src/schemas/training.plan';

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
    const exerciseId = await Exercise.create({
      "_id": "5099803df3f4948bd2f98391",
      "name": "Bench Press",
      "instruction": "Push the bar.",
      "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
      "muscle": "breast",
      "equipment": "barbell"
    })
    const executionId = await Execution.create({
      "_id": "634ada657b24b0184c17e935",
      "exercise": exerciseId._id,
      "notes": [
        "string"
      ],
      "sets": [
        {
          "_id": "634ada677b24b0184c17e941",
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
        executionId._id
      ]
    })

    const response = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dja5&id=[5099803df3f4948bd2f98548]")

    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal([
      {
        "__v": 0,
        "_id": "5099803df3f4948bd2f98548",
        "userId": "5099803df3f494add2f9dja5",
        "trainingDayId": "5099803df3f4948bd2f9dja5",
        "date": "2016-05-18T16:30:00Z",
        "executions": [
          {
            "__v": 0,
            "_id": "634ada657b24b0184c17e935",
            "exercise": {
              "__v": 0,
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
                "_id": "634ada677b24b0184c17e941",
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
    const exerciseId = await Exercise.create({
      "_id": "5099803df3f4948bd2f98391",
      "name": "Bench Press",
      "instruction": "Push the bar.",
      "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
      "muscle": "breast",
      "equipment": "barbell"
    })
    const executionId = await Execution.create({
      "_id": "634ada677b24b0184c17e940",
      "exercise": {
        "_id": exerciseId._id
      },
      "notes": [
        "string"
      ],
      "sets": [
        {
          "_id": "634ada677b24b0184c17e941",
          "executionType": "warmup",
          "weight": 0,
          "reps": 0,
          "tenRM": 0
        }
      ]
    })
    const objId = executionId._id
    await TrainingSession.create({
      "_id": "5099803df3f4948bd2f98548",
      "userId": "5099803df3f494add2f9dja5",
      "trainingDayId": "5099803df3f4948bd2f9dja5",
      "date": "2016-05-18T16:30:00Z",
      "executions": [
        {"_id":objId}
      ]
    })

    const response = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dja5")

    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal([
      {
        "__v": 0,
        "_id": "5099803df3f4948bd2f98548",
        "userId": "5099803df3f494add2f9dja5",
        "trainingDayId": "5099803df3f4948bd2f9dja5",
        "date": "2016-05-18T16:30:00Z",
        "executions": [
          {
            "__v": 0,
            "_id": "634ada677b24b0184c17e940",
            "exercise": {
              "__v": 0,
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
                "_id": "634ada677b24b0184c17e941",
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
      _id: '5099803df3f4948bd2f9db12',
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
    const trainingDay2 = await TrainingDay.create({
      _id: '5099803df3f4948bd2f9db11',
      name: 'Pull',
      exercises: [
        {
          _id: exerciseId,
          exerciseId: exerciseId,
          reps: 1,
          sets: 1
        }
      ]
    });
    const trainingDayId = trainingDay._id.toString();
    const trainingDayId2 = trainingDay2._id.toString();
    const planRes = await TrainingPlan.create({
      _id: '5d99802df3f4948bd2f9daa1',
      name: 'Bruno',
      split: 6,
      trainingDays: [trainingDayId, trainingDayId2],
      nextDay: 0,
    });

    const trainingSession = {
      _id: "5099803df3f4948bd2f98548",
      userId: "5099803df3f494add2f9dba5",
      trainingDayId: trainingDayId,
      date: "2016-05-18T16:30:00Z",
      executions: [
        {
          exercise: {
            _id: "5099803df3f4948bd2f98391",
            name: "Bench Press",
            instruction: "Push the bar.",
            gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
            muscle: "breast",
            equipment: "barbell"
          },
          notes: [
            "string"
          ],
          sets: [
            {
              executionType: "warmup",
              weight: 1,
              reps: 1,
              tenRM: 1
            }
          ]
        }
      ]
    }

    const res = await testserver.post(`/trainingSession?trainingPlanId=${ planRes._id }`).send(trainingSession).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const plan = await testserver.get(`/trainingPlan?trainingPlanId=${ planRes._id._id }`);
    expect(plan.body.nextDay).to.equal(1);

    const res2 = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dba5");
    expect(res2.status).to.equal(200);
  });

  test('Post Method with status 202', async ()=>{
    const trainingSession = {
      _id: "5099803df3f4948bd2f98548",
      userId: "5099803df3f494add2f9dba5",
      trainingDayId: "5099803df3f4948bd2f9dba5",
      date: "2016-05-18T16:30:00Z",
      executions: [
        {
          exercise: {
            _id: "5099803df3f4948bd2f98391",
            name: "Bench Press",
            instruction: "Push the bar.",
            gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
            muscle: "breast",
            equipment: "barbell"
          },
          notes: [
            "string"
          ],
          sets: [
            {
              executionType: "warmup",
              weight: 0,
              reps: 0,
              tenRM: 0
            }
          ]
        }
      ]
    }

    const res = await testserver.post("/trainingSession").send(trainingSession).set('Accept', 'application/json');
    expect(res.status).to.equal(202);

    const res2 = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dba5");
    expect(res2.status).to.equal(200);
  });

  test('Post Method with 400 error', async ()=>{
    const trainingSession = {
      _id: "5099803df3f4948bd2f98548",
      date: "2016-05-18T16:30:00Z",
      executions: []
    }

    const res = await testserver.post("/trainingSession").send(trainingSession).set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  });
})