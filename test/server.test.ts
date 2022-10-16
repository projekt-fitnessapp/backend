import { describe, test } from "mocha";
import { setupServer, connectDB } from "../src/server";
import { expect } from "chai";

describe("setupServer", () => {
  test("Sets port in process.env :)", () => {
    setupServer(true);
    expect(process.env.PORT).to.equal("3000");
  });
});

describe("Connect to DB", () => {
  test("Sets DB_URL in process.env :", () => {
    connectDB(true);
    expect(process.env.DB_URL).to.equal(
      "mongodb+srv://test:test@cluster0.r1rtx.mongodb.net/?retryWrites=true&w=majority"
    );
  });
});
