import type { Character } from '../domain/character/type/Character';
import type { CharactersData } from '../domain/character/type/CharacterResponse';
import type { ICharacterRepository } from '../repository/ICharacterRepository';


export class CharacterService {
    private repository: ICharacterRepository;

    constructor(repository: ICharacterRepository) {
        this.repository = repository;
    }

    async getAllCharacters(page: number = 1): Promise<CharactersData> {
        return this.repository.getAllCharacters(page);
    }

    async getCharacterById(id: string): Promise<Character | null> {
        return this.repository.getCharacterById(id);
    }

    async getCharacterByName(name: string, page: number = 1): Promise<Character | null> {
        return this.repository.getCharacterByName(name, page);
    }
}