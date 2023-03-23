import { TestDatabase } from "../../src/helpers/testhelpers";
import { describe, test, beforeEach, afterEach } from "mocha";
import chai, { expect } from "chai";
import supertest from "supertest";
import { setupServer } from "../../src/server";
import { Exercise } from "../../src/schemas/exercise";
import { testObjects } from "./exercise.testobjects";
import deepEqualInAnyOrder from "deep-equal-in-any-order";
import { TExercise } from "../../src/types/db/exercise.types";


chai.use(deepEqualInAnyOrder);

describe('Exercise Endpoint Tests', () => {
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


  test('Get Method with one element in db', async () => {
    await Exercise.create({
      _id: '634ac754a956a13abd771083',
      name: '3/4 sit-up',
      instruction:
        'Lie down on the floor and secure your feet. Your legs should be bent at the knees. Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position. Flex your hips and spine to raise your torso toward your knees. At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down. Repeat for the recommended amount of repetitions.',
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0001.gif',
      muscle: 'abs',
      equipment: 'body weight',
    });

    const res = await testserver.get('/exercises');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([
      {
        _id: '634ac754a956a13abd771083',
        name: '3/4 sit-up',
        instruction:
          'Lie down on the floor and secure your feet. Your legs should be bent at the knees. Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position. Flex your hips and spine to raise your torso toward your knees. At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down. Repeat for the recommended amount of repetitions.',
        gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0001.gif',
        muscle: 'abs',
        equipment: 'body weight',
      },
    ]);
  });


  test("Get Method with one out of every exercises found by name", async () => {
    for (const testObject of testObjects){
      await Exercise.create(testObject);
    };

    const res = await testserver.get(
      '/exercises?name=Preacher Curls'
    );
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([
      {
        _id: "63ff1213bab825a9906e48de",
        name: "Preacher Curls",
        instruction: "Setze dich an die Preacher-Curl-Maschine und lege deine Arme auf das gepolsterte Kissen. Greife die Stange mit einem Untergriff und hebe sie an, bis deine Arme vollständig gestreckt sind. Beuge nun die Arme und führe die Stange langsam zur Stirn. Halte die Spannung für einen Moment und senke die Stange dann langsam wieder ab.",
        gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0592.gif",
        muscle: "Bizeps",
        equipment: "Machine"
      },
    ]);
  });


  test("Get Method all exercises with body weight equipment", async () => {
    for (const testObject of testObjects){
      await Exercise.create(testObject);
    };

    const res = await testserver.get('/exercises?equipment=body weight');
    expect(res.status).to.equal(200);
    res.body.forEach((element: TExercise) => {
      expect(element).to.have.property('equipment', 'body weight');
    });
  });


  test("Get Method all exercises with target muscle abs", async () => {
    for (const testObject of testObjects){
      await Exercise.create(testObject);
    };

    const res = await testserver.get('/exercises?muscle=abs');
    expect(res.status).to.equal(200);
    res.body.forEach((element: TExercise) => {
      expect(element).to.have.property('muscle', 'abs');
    });
  });

  afterEach(async () => {
    await testdb.cleanup();
  });
});
