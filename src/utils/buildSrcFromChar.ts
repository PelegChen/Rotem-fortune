import { Character } from '../models/character.ts';

export const buildSrcFromChar = (char:Character) => {
    return `./src/assets/pictures/${char.file}`;
}
