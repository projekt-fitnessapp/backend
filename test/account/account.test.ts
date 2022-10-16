import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { setupServer } from "../../src/server";

import { Account } from '../../src/schemas/account';

describe("Account Endpoint Tests", ()=>{
    const testdb = new TestDatabase();
    const testserver = supertest(setupServer(true))

    beforeEach(async ()=>{
        try {
            await testdb.initialize();
        } catch(e) {
            console.log(e);
        }

    });

    test('Get Method with error 404', async ()=>{
    const res = await testserver.get("/account?userId=5099803df3f494add2f9dba8");
    expect(res.status).to.equal(404);
    expect(res.body == null);
  });

  test('Get Method with error 400', async ()=>{
    const res = await testserver.get("/account?userId=2045");
    expect(res.status).to.equal(400);
    expect(res.body == null);
  });

  test('Get Method with no error', async ()=>{
    var mongoose = require('mongoose');
    var objectId = mongoose.Types.ObjectId('5099803df3f494add2f9d707');
    await Account.create({
      _id: objectId,
      sex: 'male',
      birthdate: "12.12.2010",
      name: "Max Mustermann",
      google_id: "5099803df3f494add2f9dba7"
    });

    const res = await testserver.get("/account?userId=5099803df3f494add2f9d707");
    expect(res.status).to.equal(200);
    expect(res.body == null);
  });

  test('Post Method with no error', async ()=>{
    let testaccount = {
      _id: '5099803df3f494add2f9d757',
      birthdate: "12.12.2010",
      name: "Max Mustermann",
      google_id: "5099803df3f494add2f9dba7"
      };
  

    const res = await testserver.post("/account").send(testaccount).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const res2 = await testserver.get("/account?userId=5099803df3f494add2f9d757");
    expect(res2.status).to.equal(200);
  });

  test('Post Method with 401 error', async ()=>{
  

    const res = await testserver.post("/account").send("Max Mustermann").set('Accept', 'application/json');
    expect(res.status).to.equal(400);
  });

  

   test('Put Method with no error', async ()=>{
    let testaccount = {
      _id: '5099803df3f494add2f9d757',
      birthdate: "12.12.2010",
      name: "Max Mustermann",
      google_id: "5099803df3f494add2f9dba7"
      };

    await testserver.post("/account").send(testaccount).set('Accept', 'application/json');

    testaccount.name = "Maximilian Mustermann";


    const res = await testserver.put("/account").send(testaccount);
    expect(res.status).to.equal(201);

    const res2 = await testserver.get("/account?userId=5099803df3f494add2f9d757");
    expect(res2.status).to.equal(200);
  });

  test('Put Method with 400 error', async ()=>{
    const res = await testserver.put("/account").send("Keine UserID");
    expect(res.status).to.equal(400);
  });
 
    afterEach(async ()=>{
      await testdb.cleanup()
    });
})