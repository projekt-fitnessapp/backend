import { describe, test } from "mocha";
import { setupServer } from "../../src/server";
import supertest from "supertest";
import { expect } from "chai";

const requestWithSupertest = supertest(setupServer(true));

describe("Account Endpoint Tests", () => {
  test("GET /accounts :)", async () => {
    const res = await requestWithSupertest.get("/account?userId=5099803df3f494add2f9dba8");
    expect(res.status).to.equal(404);
    expect(res.body == null)
  });
});
