import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import { setupServer } from '../../src/server';
import { formatISO, subDays } from '../../src/helpers/dates';

describe('LastTraining Endpoint Tests', () => {
  const testdb = new TestDatabase();
  const testserver = supertest(setupServer(true));

  beforeEach(async () => {
    try {
      await testdb.initialize();
    } catch (e) {
      console.log(e);
    }
  });

  test('Get Method 200 w/ no day trained', async () => {
    const res = await testserver.get('/lastTraining?days=7');
    const now = Date.now();
    const notTrainedLast7Days = [];
    for (let index = 0; index < 7; index++) {
      notTrainedLast7Days.push({
        date: `${formatISO(subDays(now, index)).split('T')[0]}`,
        trained: false,
      });
    }
    expect(res.status).to.equal(200);
    expect(res.body.data).to.equal;
  });

  test('Get Method 400 bc of negative value', async () => {
    const res = await testserver.get('/lastTraining?days=\\-7');
    expect(res.status).to.equal(400);
  });

  test('Get Method 400 bc of missing value', async () => {
    const res = await testserver.get('/lastTraining');
    expect(res.status).to.equal(400);
  });

  //! Missing Test w/ days trained

  afterEach(async () => {
    await testdb.cleanup();
  });
});
