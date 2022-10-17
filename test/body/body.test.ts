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
    
        const res = await testserver.get("/body?userId=5099803df3f494add2f9dba7");
        expect(res.status).to.equal(200);
      });

  test('Get Method with error 400', async ()=>{
    const res = await testserver.get("/body?wrongInput=204dfdsafaxxd5");
    expect(res.status).to.equal(400);
    expect(res.body.data).to.equal(undefined);
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

    const res2 = await testserver.get("/body?userId=5099803df3f494add2f9dba7");
    expect(res2.status).to.equal(200);
  });

  test('Post Method with no error, get the newest record of body data', async ()=>{
    let testbody = {
        _id: '5099803da3f494add2f5d757',
        userId: "5099803df3f494add2f9dba7",
        date: "12.12.2010",
        height: 1.82,
        weight: 75
      };

      let testbodytwo = {
        _id: '5099803da3f494add2f5d758',
        userId: "5099803df3f494add2f9dba7",
        date: "12.12.2011",
        height: 1.84,
        weight: 95
      };
  
    const res = await testserver.post("/body").send(testbody).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const res2 = await testserver.post("/body").send(testbodytwo).set('Accept', 'application/json');
    expect(res2.status).to.equal(201);

    const res3 = await testserver.get("/body?userId=5099803df3f494add2f9dba7");
    expect(res3.status).to.equal(200);
    expect(res3.body.date).to.equal("12.12.2011");
  });

  test('Post Method with 401 error', async ()=>{
    const res = await testserver.post("/body").send("Wrong Data").set('Accept', 'application/json');
    expect(res.status).to.equal(401);
    expect(res.body.data).to.equal(undefined);
  });

 
    afterEach(async ()=>{
      await testdb.cleanup()
    });
})