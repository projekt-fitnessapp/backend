import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { setupServer } from "../../src/server";

import { Benchmarking } from '../../src/schemas/benchmarking';

describe("Benchmarking Endpoint Tests", ()=>{
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
        await Benchmarking.create({
            _id: "5099803df3f494add2f9d707",
            userId: "5099803df3f414add2f9dba7",
            amount_of_pull_ups: 35,
            amount_of_push_ups: 35,
            weightlifting_weight: 125,
            week_counter: 4
        });
    
        const res = await testserver.get("/body?userId=5099803df3f414add2f9dba7");
        expect(res.status).to.equal(200);
      });

  test('Get Method with error 400', async ()=>{
    const res = await testserver.get("/body?wrongInput=204dfdsafaxxd5");
    expect(res.status).to.equal(400);
    expect(res.body.data).to.equal(undefined);
  });

  test('Post Method with no error', async ()=>{
    let testbodyofbenchmarking = {
        _id: '5099803da3f494add2f5d757',
        userId: "5099803df3f494add2f9dba7",
        amount_of_pull_ups: 35,
        amount_of_push_ups: 35,
        weightlifting_weight: 125,
        week_counter: 4
      };
  
    const res = await testserver.post("/benchmarking").send(testbodyofbenchmarking).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const res2 = await testserver.get("/body?userId=5099803df3f494add2f9dba7");
    expect(res2.status).to.equal(200);
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