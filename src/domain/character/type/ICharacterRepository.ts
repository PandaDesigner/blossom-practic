import type { CharacterFilters } from './CharacterFilters';
import type { CharacterResponse } from './CharacterResponse';

export interface CharacterListResponse {
    results: Array<CharacterResponse>
    info: {
        count: number
        pages: number
        next: number | null
        prev: number | null
    }
}

export interface ICharacterRepository {
    getCharacters(filters: CharacterFilters): Promise<CharacterListResponse>
}