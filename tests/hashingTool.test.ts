import { describe, expect, it } from 'vitest';
import { basicHashToInt, veryBasicHash } from '../src/utils/hashingTools';

describe('Hashing tools test', () => {

    it('very basic hash', () => {
        const text = "hello there";
        const hash = veryBasicHash(text)
        expect(hash).toBe(1791114646);
    });
    it('basicHashToInt', ()=> {
        const hashes =  'abp123'
        const toInt = basicHashToInt(veryBasicHash(hashes), 100)
        expect(toInt).toBe(8)
    })
    it('basicHashToInt returns different numbers', ()=> {
        const hashes =  'abp123'
        const toInt1 = basicHashToInt(veryBasicHash(hashes), 100)
        const toInt2 = basicHashToInt(veryBasicHash(hashes), 200)
        expect(toInt1).toBe(8)
        expect(toInt2).toBe(108)
    })
});
