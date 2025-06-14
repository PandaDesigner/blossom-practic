import type { Character } from '../../domain/character/type/Character';
import type { CharactersData } from '../../domain/character/type/CharacterResponse';
import type { ICharacterRepository } from '../../repository/ICharacterRepository';
import { CharacterService } from '../CharacterService';


describe('CharacterService', () => {
    let characterService: CharacterService;
    let mockRepository: jest.Mocked<ICharacterRepository>;

    beforeEach(() => {
        mockRepository = {
            getAllCharacters: jest.fn(),
            getCharacterById: jest.fn(),
            getCharacterByName: jest.fn(),
        };
        characterService = new CharacterService(mockRepository);
    });

    describe('getAllCharacters', () => {
        it('should return characters data for default page 1', async () => {
            const mockData: CharactersData = {
                info: {
                    count: 1, pages: 1,
                    next: null,
                    prev: null
                },
                results: [{
                    id: '1', name: 'Rick',
                    status: 'Alive',
                    type: '',
                    species: '',
                    image: '',
                    gender: 'unknown'
                }]
            };
            mockRepository.getAllCharacters.mockResolvedValue(mockData);

            const result = await characterService.getAllCharacters();

            expect(mockRepository.getAllCharacters).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockData);
        });

        it('should return characters data for specified page', async () => {
            const page = 2;
            const mockData: CharactersData = {
                info: {
                    count: 1, pages: 2,
                    next: null,
                    prev: null
                },
                results: [{
                    id: '2', name: 'Morty',
                    status: 'Alive',
                    type: '',
                    species: '',
                    image: '',
                    gender: 'unknown'
                }]
            };
            mockRepository.getAllCharacters.mockResolvedValue(mockData);

            const result = await characterService.getAllCharacters(page);

            expect(mockRepository.getAllCharacters).toHaveBeenCalledWith(page);
            expect(result).toEqual(mockData);
        });
    });

    describe('getCharacterById', () => {
        it('should return character when found', async () => {
            const mockCharacter: Character = {
                id: '1', name: 'Rick',
                status: 'Alive',
                type: '',
                species: '',
                image: '',
                gender: 'unknown'
            };
            mockRepository.getCharacterById.mockResolvedValue(mockCharacter);

            const result = await characterService.getCharacterById('1');

            expect(mockRepository.getCharacterById).toHaveBeenCalledWith('1');
            expect(result).toEqual(mockCharacter);
        });

        it('should return null when character not found', async () => {
            mockRepository.getCharacterById.mockResolvedValue(null);

            const result = await characterService.getCharacterById('999');

            expect(mockRepository.getCharacterById).toHaveBeenCalledWith('999');
            expect(result).toBeNull();
        });
    });

    describe('getCharacterByName', () => {
        it('should return character when found with default page', async () => {
            const mockCharacter: Character = {
                id: '1', name: 'Rick',
                status: 'Alive',
                type: '',
                species: '',
                image: '',
                gender: 'unknown'
            };
            mockRepository.getCharacterByName.mockResolvedValue(mockCharacter);

            const result = await characterService.getCharacterByName('Rick');

            expect(mockRepository.getCharacterByName).toHaveBeenCalledWith('Rick', 1);
            expect(result).toEqual(mockCharacter);
        });

        it('should return character when found with specified page', async () => {
            const mockCharacter: Character = {
                id: '1', name: 'Rick',
                status: 'Alive',
                type: '',
                species: '',
                image: '',
                gender: 'unknown'
            };
            mockRepository.getCharacterByName.mockResolvedValue(mockCharacter);

            const result = await characterService.getCharacterByName('Rick', 2);

            expect(mockRepository.getCharacterByName).toHaveBeenCalledWith('Rick', 2);
            expect(result).toEqual(mockCharacter);
        });

        it('should return null when character not found', async () => {
            mockRepository.getCharacterByName.mockResolvedValue(null);

            const result = await characterService.getCharacterByName('NonExistent');

            expect(mockRepository.getCharacterByName).toHaveBeenCalledWith('NonExistent', 1);
            expect(result).toBeNull();
        });
    });
});
