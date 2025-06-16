import type { Character } from '../../type/Character';
import type { SortStrategy } from './SortStrategy';

export class SortByNameZA implements SortStrategy {
    sort(characters: Array<Character>): Array<Character> {
        return [...characters].sort((a, b) => b.name.localeCompare(a.name));
    }
}