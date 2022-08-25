import { describe, test } from 'mocha';
import { expect } from 'chai';

describe('Hello World from Testsuite', ()=>{

    test('I am a test :)', ()=>{
        expect(true).equal(true);
    });

    [
        {
            name: 'First',
            param: 'I am parameterized'
        },
        {
            name: 'Second',
            param: 'Me too'
        }
    ].forEach((testcase)=>{
        test(testcase.name, ()=>{
            expect(typeof testcase.param).to.equal('string');
        })
    });

});