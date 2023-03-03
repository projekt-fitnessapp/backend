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
            exercise_one_amount: 35,
            exercise_one_name: "pullups",
            exercise_two_amount: 35,
            exercise_two_name: "pushups",
            exercise_three_amount: 125,
            exercise_three_name: "weightlifting",
            week_counter: 4
        });
    
        const res = await testserver.get("/benchmarking?userId=5099803df3f414add2f9dba7");
        expect(res.status).to.equal(200);
      });

  test('Get Method with error 400', async ()=>{
    const res = await testserver.get("/benchmarking?wrongInput=204dfdsafaxxd5");
    expect(res.status).to.equal(400);
    expect(res.body.data).to.equal(undefined);
  });

  test('Post Method with no error and three exercises', async ()=>{
    let testbodyofbenchmarking = {
        _id: '5099803da3f494add2f5d757',
        userId: "5099803df3f494add2f9dba7",
        exercise_one_amount: 35,
        exercise_one_name: "pullups",
        exercise_two_amount: 35,
        exercise_two_name: "pushups",
        exercise_three_amount: 125,
        exercise_three_name: "weightlifting",
        week_counter: 4
      };
  
    const res = await testserver.post("/benchmarking").send(testbodyofbenchmarking).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const res2 = await testserver.get("/benchmarking?userId=5099803df3f494add2f9dba7");
    expect(res2.status).to.equal(200);
  });

  test('Post Method with no error and only one exercise', async ()=>{
    let testbodyofbenchmarking = {
        _id: '5099803da3f494add2f5d757',
        userId: "5099803df3f494add2f9dba7",
        exercise_one_amount: 35,
        exercise_one_name: "pullups",
        week_counter: 4
      };
  
    const res = await testserver.post("/benchmarking").send(testbodyofbenchmarking).set('Accept', 'application/json');
    expect(res.status).to.equal(201);

    const res2 = await testserver.get("/benchmarking?userId=5099803df3f494add2f9dba7");
    expect(res2.status).to.equal(200);
  });


  test('Post Method with 401 error', async ()=>{
    const res = await testserver.post("/benchmarking").send("Wrong Data").set('Accept', 'application/json');
    expect(res.status).to.equal(401);
    expect(res.body.data).to.equal(undefined);
  });

 
    afterEach(async ()=>{
      await testdb.cleanup()
    });
})