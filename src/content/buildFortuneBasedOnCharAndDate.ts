import { Character } from '../models/character.ts';
import { fortunes } from '../data/fortunes.ts';
import { basicHashToInt, veryBasicHash } from '../utils/hashingTools.ts';

const getHashFromCharAndDate = (character: Character, date: Date): number => {
    const charAsString = character.name;
    const dateAsString = date.getDate() + date.getFullYear() + date.getMonth();
    return  veryBasicHash((charAsString + dateAsString) );
}


export const buildFortuneBasedOnCharAndDate = (character: Character, date: Date): string => {
    const intFromDateAndChar = getHashFromCharAndDate(character, date);
    const lengthOfFortunes = fortunes.length;
    const numberOfFortune =  basicHashToInt(intFromDateAndChar, lengthOfFortunes);
    return  fortunes[numberOfFortune] as string;

}
