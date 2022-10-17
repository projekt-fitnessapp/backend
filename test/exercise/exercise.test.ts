import { TestDatabase } from "../../src/helpers/testhelpers";
import { describe, test, beforeEach, afterEach } from "mocha";
import chai, { expect } from "chai";
import supertest from "supertest";
import { setupServer } from "../../src/server";
import { Excercise } from "../../src/schemas/excercise";
import { testObjects } from "./exercise.testobjects";
import deepEqualInAnyOrder from "deep-equal-in-any-order";
import { TExcercise } from "../../src/types/db/exercise.types";

chai.use(deepEqualInAnyOrder);

describe("Exercise Endpoint Tests", () => {
  const testdb = new TestDatabase();
  const testserver = supertest(setupServer(true));

  beforeEach(async () => {
    try {
      await testdb.initialize();
    } catch (e) {
      console.log(e);
    }
  });

  test("Get Method with no element in db", async ( ) => {
    const res = await testserver.get("/exercises");
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([]);
  });

  test("Get Method with one element in db", async () => {
    await Excercise.create({
      _id: "634ac754a956a13abd771083",
      name: "3/4 sit-up",
      instruction:
        "Lie down on the floor and secure your feet. Your legs should be bent at the knees. Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position. Flex your hips and spine to raise your torso toward your knees. At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down. Repeat for the recommended amount of repetitions.",
      gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
      muscle: "abs",
      equipment: "body weight",
    });

    const res = await testserver.get("/exercises");
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([
      {
        _id: "634ac754a956a13abd771083",
        name: "3/4 sit-up",
        instruction:
          "Lie down on the floor and secure your feet. Your legs should be bent at the knees. Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position. Flex your hips and spine to raise your torso toward your knees. At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down. Repeat for the recommended amount of repetitions.",
        gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
        muscle: "abs",
        equipment: "body weight",
      },
    ]);
  });

  test("Get Method with one out of 37 found by name", async () => {
    for (const testObject of testObjects){
      await Excercise.create(testObject);
    };

    const res = await testserver.get(
      "/exercises?name=assisted triceps dip (kneeling)"
    );
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([
      {
        _id: "634ac754a956a13abd7710a9",
        name: "assisted triceps dip (kneeling)",
        instruction:
          "Sit securely in a dip machine, select the weight and firmly grasp the handles. Now keep your elbows in at your sides in order to place emphasis on the triceps. The elbows should be bent at a 90 degree angle. As you contract the triceps, extend your arms downwards as you exhale. Tip: At the bottom of the movement, focus on keeping a little bend in your arms to keep tension on the triceps muscle. Now slowly let your arms come back up to the starting position as you inhale. Repeat for the recommended amount of repetitions.  Variations: You can perform this exercise on parallel bars or on a triceps dip assist machine.",
        gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0019.gif",
        muscle: "triceps",
        equipment: "leverage machine",
      },
    ]);
  });

  test("Get Method all exercises with body weight equipment", async () => {
    for (const testObject of testObjects){
      await Excercise.create(testObject);
    };

    const res = await testserver.get("/exercises?equipment=body weight");
    expect(res.status).to.equal(200);
    res.body.forEach((element: TExcercise) => {
      expect(element).to.have.property("equipment", "body weight");
    });
  });

  test("Get Method all exercises with target muscle abs", async () => {
    for (const testObject of testObjects){
      await Excercise.create(testObject);
    };

    const res = await testserver.get("/exercises?muscle=abs");
    expect(res.status).to.equal(200);
    res.body.forEach((element: TExcercise) => {
      expect(element).to.have.property("muscle", "abs");
    });
  });

  afterEach(async () => {
    await testdb.cleanup();
  });
});
