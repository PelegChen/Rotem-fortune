import { Character } from '../models/character.ts';
import { fortunes } from '../data/fortunes.ts';
import { basicHashToInt, veryBasicHash } from '../utils/hashingTools.ts';
import { describe, expect, it } from 'vitest';
import { characters } from '../data/characters.ts';

const getHashFromCharAndDate = (character: Character, date: Date): number => {
    const charAsString = character.name;
    const dateAsString = date.getDate() + date.getFullYear() + date.getMonth();
    return veryBasicHash((charAsString + dateAsString));
};


export const buildFortuneBasedOnCharAndDate = (character: Character, date: Date): string => {
    const intFromDateAndChar = getHashFromCharAndDate(character, date);
    const lengthOfFortunes = fortunes.length;
    const numberOfFortune = basicHashToInt(intFromDateAndChar, lengthOfFortunes);
    return fortunes[numberOfFortune] as string;

};

// @ts-expect-error the vitest exists
if (import.meta.vitest) {
    describe('buildFortuneBasedOnCharAndDate', () => {
        it('should return a fortune', () => {
            const character = characters[0];
            const date = new Date();
            const fortune = buildFortuneBasedOnCharAndDate(character, date);
            expect(typeof fortune).toBe('string');
        });
        it('should return a fortune that exist int the object', () => {
            const character = characters[0];
            const date = new Date();
            const fortune = buildFortuneBasedOnCharAndDate(character, date);
            expect(fortunes.includes(fortune)).toBe(true);
        });
        it('should return the same fortune for the same character and date', () => {
            const character = characters[0];
            const date = new Date();
            const fortune = buildFortuneBasedOnCharAndDate(character, date);
            const fortune2 = buildFortuneBasedOnCharAndDate(character, date);
            expect(fortune).toBe(fortune2);

        });
    });
}
