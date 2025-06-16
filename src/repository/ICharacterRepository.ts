import type { Character } from '../domain/character/type/Character';
import type { CharactersData } from '../domain/character/type/CharacterResponse';

export interface ICharacterRepository {
    getAllCharacters(page?: number): Promise<CharactersData>;
    getCharacterByName(name: string, page?: number): Promise<Character | null>;
    getCharacterById(id: string): Promise<Character | null>;
}