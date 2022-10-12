import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { setupServer } from "../../src/server";

import { Account } from '../../src/schemas/account';


const requestWithSupertest = supertest(setupServer(true));

describe("Account Endpoint Tests", ()=>{
    const testdb = new TestDatabase();

    beforeEach(async ()=>{
        try {
            await testdb.initialize();
           await Account.create({
              sex: 'male',
              birthdate: "12.12.2010",
              name: "Max Mustermann",
              google_id: "5099803df3f494add2f9dba4"
            });
        } catch(e) {
            console.log(e);
        }

    });

    test('Get Method with error 404', async ()=>{
    const res = await requestWithSupertest.get("/account?userId=5099803df3f494add2f9dba8");
    expect(res.status).to.equal(404);
    expect(res.body == null);
  });

  test('Get Method with error 400', async ()=>{
    const res = await requestWithSupertest.get("/account?userId=2045");
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

    const res = await requestWithSupertest.get("/account?userId=5099803df3f494add2f9d707");
    expect(res.status).to.equal(200);
    expect(res.body == null);
  });


    afterEach(async ()=>{
        await testdb.cleanup();
    });
})