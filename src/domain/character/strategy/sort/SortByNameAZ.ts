import type { Character } from '../../type/Character';
import type { SortStrategy } from './SortStrategy';

export class SortByNameAZ implements SortStrategy {
    sort(characters: Array<Character>): Array<Character> {
        return [...characters].sort((a, b) => a.name.localeCompare(b.name));
    }
}