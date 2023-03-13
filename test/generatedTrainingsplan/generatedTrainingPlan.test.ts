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

  afterEach(async () => {
    await testdb.cleanup();
  });

  test('Post with no error (201) --> not enough exercises for chosen trainingType', async () => {

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
        numberOfTraininssession: 4,
        trainingsStatus: "untrained",
        trainingsType: "withMachines"
      };
  
    const res = await testserver.post("/generatedTrainingsplan").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

  });

  test('Post with no error (201) --> 2 Trainingssessions', async () => {

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

  test('Post with no error (201) --> 4 Trainingssessions', async () => {

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
        numberOfTraininssession: 4,
        trainingsStatus: "untrained",
        trainingsType: "withMachines"
      };
  
    const res = await testserver.post("/generatedTrainingsplan").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

  });

  test('Post with no error (201) --> 6 Trainingssessions', async () => {

    for (const testObject of testObjects){
      await Exercise.create(testObject);
    };

    var mongoose = require('mongoose');
    var objectId = mongoose.Types.ObjectId('5099803df3f493add2f94707');
    await Account.create({
      _id: objectId,
      sex: 'male',
      birthdate: "12.12.2010",
      name: "Max Mustermann",
      google_id: "5099803df3f494add2f9dba7"
    });

    let testbody = {
        user_id: "5099803df3f493add2f94707",
        numberOfTraininssession: 6,
        trainingsStatus: "untrained",
        trainingsType: "withMachines"
      };
  
    const res = await testserver.post("/generatedTrainingsplan").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

  });

  test('Post 400 without userId', async () => {

    let testbody = {
        user_id: "",
        numberOfTraininssession: 2,
        trainingsStatus: "untrained",
        trainingsType: "withMachines"
      };

    const res = await testserver.post("/generatedTrainingsplan").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  });

  test('Post 400 without numberOfTraininssession', async () => {

    var mongoose = require('mongoose');
    var objectId = mongoose.Types.ObjectId('5099503df6f494ade3f9d705');

    let testbody = {
        user_id: objectId,
        numberOfTraininssession: null,
        trainingsStatus: "untrained",
        trainingsType: "withMachines"
      };

    const res = await testserver.post("/generatedTrainingsplan").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  });

  test('Post 400 without trainingsType', async () => {

    var mongoose = require('mongoose');
    var objectId = mongoose.Types.ObjectId('5099503df6f494ade3f9d705');

    let testbody = {
        user_id: objectId,
        numberOfTraininssession: 2,
        trainingsStatus: "untrained",
        trainingsType: null
      };

    const res = await testserver.post("/generatedTrainingsplan").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  });

  test('Post 400 with non existent userId', async () => {

    var mongoose = require('mongoose');
    var objectId = mongoose.Types.ObjectId('2029503df6f294ade3f2d705');

    let testbody = {
        user_id: objectId,
        numberOfTraininssession: 2,
        trainingsStatus: "untrained",
        trainingsType: "withMachines"
      };

    const res = await testserver.post("/generatedTrainingsplan").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  });

});
