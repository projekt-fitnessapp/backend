import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { setupServer } from "../../src/server";

import { Body } from '../../src/schemas/body';

describe("Body Endpoint Tests", ()=>{
    const testdb = new TestDatabase();
    const testserver = supertest(setupServer(true))

    beforeEach(async ()=>{
        try {
            await testdb.initialize();
        } catch(e) {
            console.log(e);
        }

    });

    test('Get Method with no error', async ()=>{
        await Body.create({
            _id: "5099803df3f494add2f9d707",
            userId: "5099803df3f494add2f9dba7",
            date: "12.12.2010",
            height: 1.78,
            weight: 75
        });
    
        const res = await testserver.get("/body?userId=5099803df3f494add2f9d707");
        expect(res.status).to.equal(200);
        expect(res.body = {
          _id: "5099803df3f494add2f9d707",
          userId: "5099803df3f494add2f9dba7",
          date: "12.12.2010",
          height: 1.78,
          weight: 75
      });
      });

  test('Get Method with error 400', async ()=>{
    const res = await testserver.get("/body?userId=2045");
    expect(res.status).to.equal(400);
    expect(res.body == null);
  });

  test('Post Method with no error', async ()=>{
    let testbody = {
        _id: '5099803da3f494add2f5d757',
        userId: "5099803df3f494add2f9dba7",
        date: "12.12.2010",
        height: 1.82,
        weight: 75
      };
  
    const res = await testserver.post("/body").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const res2 = await testserver.get("/body?userId=5099803da3f494add2f5d757");
    expect(res2.status).to.equal(200);
  });

  test('Post Method with 401 error', async ()=>{
    const res = await testserver.post("/body").send("Wrong Data").set('Accept', 'application/json');
    expect(res.status).to.equal(401);
  });

 
    afterEach(async ()=>{
      await testdb.cleanup()
    });
})