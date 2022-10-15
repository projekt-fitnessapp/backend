import { describe, test, after } from "mocha";
import { setupServer, connectDB } from "../src/server";
import { expect } from "chai";
import mongoose from "mongoose";

describe("setupServer", () => {
  test("Sets port in process.env :)", () => {
    setupServer(true);
    expect(process.env.PORT).to.equal("3000");
  });
  after(async ()=>{
    await mongoose.disconnect()
  })
});

describe("Connect to DB", () => {
  test("Sets DB_URL in process.env :", async () => {
    await connectDB(true);
    expect(process.env.DB_URL).to.equal(
      "mongodb+srv://test:test@cluster0.r1rtx.mongodb.net/?retryWrites=true&w=majority"
    );
  });
  after(async ()=>{
    await mongoose.disconnect()
  })
});
