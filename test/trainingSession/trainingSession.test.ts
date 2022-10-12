import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { TrainingSession } from '../../src/schemas/training.session';
import { setupServer } from '../../src/server';
import supertest from "supertest";

describe('Testing the training session route', () => {

    const testdb = new TestDatabase()
    const testserver = supertest(setupServer(true))

    beforeEach(async ()=>{
        try {
            await testdb.initialize()
        } catch(e) {
            console.log(e)
        }
        
    })

    test('Testing get training session with Ids', async ()=>{
        await TrainingSession.create({
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
                    "10RM": 0
                  }
                ]
              }
            ]
          })

        const response = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dja5&id=[5099803df3f4948bd2f98548]")

        expect(response).to.equal([
            {
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
                      "10RM": 0
                    }
                  ]
                }
              ]
            }
          ])
    })

    test('Testing get training session without Ids', async ()=>{
        await TrainingSession.create({
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
                    "10RM": 0
                  }
                ]
              }
            ]
          })

        const response = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dja5")

        expect(response).to.equal([
            {
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
                      "10RM": 0
                    }
                  ]
                }
              ]
            }
          ])
    })

    test('Testing get training session without a hit', async ()=>{

        const response = await testserver.get("/trainingSession?userId=5099803df3f494add2f9dja5")

        expect(response).to.equal([])
    })

    afterEach(async ()=>{
        await testdb.cleanup()
    })

})