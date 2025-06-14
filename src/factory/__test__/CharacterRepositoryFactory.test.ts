import { ApolloClient, InMemoryCache } from '@apollo/client';
import { CharacterRepositoryFactory } from '../CharacterRepositoryFactory';
import { GraphQLCharacterRepository } from '../../repository/GraphQLCharacterRepository';

jest.mock('@apollo/client');
jest.mock('../../repository/GraphQLCharacterRepository');

describe('CharacterRepositoryFactory', () => {
    const mockApiUrl = 'https://test-api.com/graphql';

    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();

        // Reset singleton instances
        (CharacterRepositoryFactory as unknown as { repository: GraphQLCharacterRepository | null }).repository = null;
        (CharacterRepositoryFactory as unknown as { apolloClient: ApolloClient<InMemoryCache> | null }).apolloClient = null;
    });

    describe('create', () => {
        it('should create a new repository instance when called for the first time', () => {
            // Act
            const repository = CharacterRepositoryFactory.create(mockApiUrl);

            // Assert
            expect(repository).toBeInstanceOf(GraphQLCharacterRepository);
            expect(ApolloClient).toHaveBeenCalledTimes(1);
            expect(ApolloClient).toHaveBeenCalledWith(
                expect.objectContaining({
                    cache: expect.any(InMemoryCache),
                    defaultOptions: {
                        watchQuery: { errorPolicy: 'ignore' },
                        query: { errorPolicy: 'all' }
                    }
                })
            );
        });

        it('should return the same repository instance on subsequent calls', () => {
            // Act
            const repository1 = CharacterRepositoryFactory.create(mockApiUrl);
            const repository2 = CharacterRepositoryFactory.create(mockApiUrl);

            // Assert
            expect(repository1).toBe(repository2);
            expect(ApolloClient).toHaveBeenCalledTimes(1);
        });
    });

    describe('createApolloClient', () => {
        it('should create a new Apollo client instance when called for the first time', () => {
            // Act
            CharacterRepositoryFactory.create(mockApiUrl);

            // Assert
            expect(ApolloClient).toHaveBeenCalledTimes(1);
            expect(ApolloClient).toHaveBeenCalledWith(
                expect.objectContaining({
                    cache: expect.any(InMemoryCache),
                    defaultOptions: {
                        watchQuery: { errorPolicy: 'ignore' },
                        query: { errorPolicy: 'all' }
                    }
                })
            );
        });

        it('should return the same Apollo client instance on subsequent calls', () => {
            // Act
            CharacterRepositoryFactory.create(mockApiUrl);
            CharacterRepositoryFactory.create(mockApiUrl);

            // Assert
            expect(ApolloClient).toHaveBeenCalledTimes(1);
        });
    });
});