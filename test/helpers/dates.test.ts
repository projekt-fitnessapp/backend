import { describe, test } from 'mocha';
import { expect } from 'chai';
import { formatISO, subDays } from '../../src/helpers/dates';

describe('Date helper', () => {
  test('formatISO()', () => {
    const date = 1665770498952; // epoch/unix time of 2022-10-14T18:01:38.952Z (UTC)
    const dateInISO = formatISO(date);
    expect(dateInISO).to.equal('2022-10-14T18:01:38.952Z');
  });

  test('subDays()', () => {
    const date = 1665770498952; // epoch/unix time of 2022-10-14T18:01:38.952Z (UTC)
    const dateSevenDaysInPast = 1665165698952; // epoch/unix time of 2022-10-07T18:01:38.952Z (UTC)
    const sevenDaysInPast = subDays(date, 7);
    expect(sevenDaysInPast).to.equal(dateSevenDaysInPast);
  });

  test('subDays() throws error', () => {
    const date = 1665770498952; // epoch/unix time of 2022-10-14T18:01:38.952Z (UTC)
    expect(subDays.bind(subDays, date, -7)).to.throw(
      'Only positive whole numbers!'
    );
  });
});
