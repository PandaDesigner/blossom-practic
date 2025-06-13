import type { Character } from '../../type/Character';


export interface SortStrategy {
    sort(characters: Array<Character>): Array<Character>;
}