import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { setupServer } from '../../src/server';
import supertest from "supertest";
import { Exercise } from '../../src/schemas/exercise';
import { Account } from '../../src/schemas/account';
import { TrainingDay } from '../../src/schemas/training.day';
import { TrainingPlan } from '../../src/schemas/training.plan';

describe('Testing the myPlans route', () => {

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

  test('Testing get myPlans with Id', async () => {
    const exerciseId = await Exercise.create({
      "_id": "5099803df3f4948bd2f98391",
      "name": "Bench Press",
      "instruction": "Push the bar.",
      "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
      "muscle": "breast",
      "equipment": "barbell"
    })
    const trainingDayId = await TrainingDay.create({
        "_id": "5099803df3f4948bd2f9dja5",
        "name": "Push",
        "exercises": [
          {
            exerciseId
          }
        ]
    })
    const trainingPlanId = await TrainingPlan.create({
        "_id": "5d99802df3f4948bd2f9dja1",
        "name": "Arnold",
        "split": 6,
        "trainingDays": [
          trainingDayId
        ],
        "nextDay": 2
    })
    await Account.create({
        "_id": "5099803df3f494add2f9dba5",
        "google_id": "110169484474386270000",
        "name": "Markus Ruehl",
        "birthdate": "1972-02-22T00:00:00Z",
        "sex": "male",
        "trainingPlans": [
            trainingPlanId
        ]
    })

    const response = await testserver.get('/myPlans?userId=5099803df3f494add2f9dba5')

    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal([
        {
          "_id": trainingPlanId,
          "name": "Arnold",
          "split": 6,
          "trainingDays": [
            {
                "_id": trainingDayId,
                "name": "Push",
                "exercises": [
                    {
                        "_id": exerciseId,
                        "name": "Bench Press",
                        "instruction": "Push the bar.",
                        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0030.gif",
                        "muscle": "breast",
                        "equipment": "barbell"
                    }
                ]
            }
          ],
          "nextDay": 2
        }
    ])
  })
})