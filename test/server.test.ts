import { describe, test } from 'mocha';
import { setupServer } from '../src/server';
import { expect } from 'chai';
import mongoose from 'mongoose';

describe('setupServer', () => {
  test('Sets port and test var in process.env :)', () => {
    setupServer(true);
    expect(process.env.PORT).to.equal('3000');
    expect(process.env.TEST).to.equal('true');
  });

 });

