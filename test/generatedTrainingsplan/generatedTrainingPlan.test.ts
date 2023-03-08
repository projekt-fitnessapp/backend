import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach } from 'mocha';
import { expect } from 'chai';
import { Exercise } from '../../src/schemas/exercise';
import { setupServer } from '../../src/server';
import { testObjects } from "../exercise/exercise.testobjects";
import { Account } from '../../src/schemas/account';
import supertest from 'supertest';

describe('Testing the generatedTrainingPlan route', () => {
  const testdb = new TestDatabase();
  const testserver = supertest(setupServer(true));

  beforeEach(async () => {
    try {
      await testdb.initialize();
    } catch (e) {
      console.log(e);
    }
  });

  test('Post with no error (201)', async () => {

    for (const testObject of testObjects){
      await Exercise.create(testObject);
    };

    var mongoose = require('mongoose');
    var objectId = mongoose.Types.ObjectId('5099803df3f494add2f9d707');
    await Account.create({
      _id: objectId,
      sex: 'male',
      birthdate: "12.12.2010",
      name: "Max Mustermann",
      google_id: "5099803df3f494add2f9dba7"
    });

    let testbody = {
        user_id: "5099803df3f494add2f9d707",
        numberOfTraininssession: 2,
        trainingsStatus: "untrained",
        trainingsType: "withMachines"
      };
  
    const res = await testserver.post("/generatedTrainingsplan").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

  });
});
