import { describe, test } from "mocha";
import { setupServer } from "../../src/server";
import supertest from "supertest";
import { expect } from "chai";

const requestWithSupertest = supertest(setupServer(true));

describe("Ping Endpoint Test", () => {
  test("Get /ping :)", async () => {
    const res = await requestWithSupertest.get("/ping");
    expect(res.status).to.equal(200);
    expect(res.body.msg).to.equal("pong");
  });
});
