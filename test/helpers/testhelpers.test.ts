import { TestDatabase } from '../../src/helpers/testhelpers';
import { describe, test, beforeEach, afterEach } from "mocha";
import { expect } from "chai";

import { Body } from '../../src/schemas/body';

describe("I do Database Related stuff :)", ()=>{
    const testdb = new TestDatabase();

    beforeEach(async ()=>{
        try {
            await testdb.initialize();
        } catch(e) {
            console.log(e);
        }
        
    });

    test('Here I can do database stuff', async ()=>{
        //here I create my testdata
        await Body.create({
            userId: "Some user id",
            date: "12.12.2022",
            height: 1,
            weight: 2
        });

        //here I do testing
        const somenumber = 1;

        //here I do assertion
        expect(somenumber).to.equal(1);
    });

    afterEach(async ()=>{
        await testdb.cleanup();
    });
})