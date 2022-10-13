import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { setupServer } from "../../src/server";

import { Account } from '../../src/schemas/account';
import { TAccount } from '../../src/types/db/account.types';


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
    const account = {} as TAccount;
    account._id = <any>'5099803df3f494add2f9d757';
    account.birthdate = "12.12.2010";
    account.name = "Max Mustermann";
    account.google_id = "5099803df3f494add2f9dba7";

  

    const res = await testserver.post("/account").send(account).set('Accept', 'application/json');
    expect(res.status).to.equal(200);
  });
 
    afterEach(async ()=>{
      await testdb.cleanup()
    });
})