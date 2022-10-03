import { describe, test } from "mocha";
import { server } from "../../src/app";
import supertest from "supertest";
import { expect } from "chai";
const requestWithSupertest = supertest(server);

describe("Ping Endpoint Test", () => {
  test("Get /ping :)", async () => {
    const res = await requestWithSupertest.get("/ping");
    expect(res.status).to.equal(200);
    expect(res.body.msg).to.equal("pong");
  });
});
