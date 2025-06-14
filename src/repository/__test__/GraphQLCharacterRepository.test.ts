import { ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { GraphQLCharacterRepository } from '../GraphQLCharacterRepository';
import { GET_ALL_CHARACTERS } from '../../domain/character/type/graphql';

describe('GraphQLCharacterRepository', () => {
    let mockClient: ApolloClient<NormalizedCacheObject>;
    let repository: GraphQLCharacterRepository;

    beforeEach(() => {
        mockClient = {
            query: jest.fn()
        } as unknown as ApolloClient<NormalizedCacheObject>;
        repository = new GraphQLCharacterRepository(mockClient);
    });

    describe('getAllCharacters', () => {
        it('should return characters data when query is successful', async () => {
            // Arrange
            const mockCharactersData = {
                info: {
                    count: 2,
                    pages: 1,
                    next: null,
                    prev: null
                },
                results: [
                    {
                        id: '1',
                        name: 'Rick Sanchez',
                        status: 'Alive',
                        species: 'Human',
                        type: '',
                        gender: 'Male',
                        image: 'https://example.com/rick.jpg',
                    },
                    {
                        id: '2',
                        name: 'Morty Smith',
                        status: 'Alive',
                        species: 'Human',
                        type: '',
                        gender: 'Male',
                        image: 'https://example.com/morty.jpg',
                    }
                ]
            };

            (mockClient.query as jest.Mock).mockResolvedValueOnce({
                data: {
                    characters: mockCharactersData
                }
            });

            // Act
            const result = await repository.getAllCharacters(1);

            // Assert
            expect(mockClient.query).toHaveBeenCalledWith({
                query: GET_ALL_CHARACTERS,
                variables: { page: 1 },
                fetchPolicy: 'cache-first'
            });
            expect(result).toEqual(mockCharactersData);
        });

        it('should throw error when response format is invalid', async () => {
            // Arrange
            (mockClient.query as jest.Mock).mockResolvedValueOnce({
                data: {}
            });

            // Act & Assert
            await expect(repository.getAllCharacters(1))
                .rejects
                .toThrow('Invalid response format');
        });

        it('should throw error when query fails', async () => {
            // Arrange
            const error = new Error('Network error');
            (mockClient.query as jest.Mock).mockRejectedValueOnce(error);

            // Act & Assert
            await expect(repository.getAllCharacters(1))
                .rejects
                .toThrow('Network error');
        });
    });
});
