import { type ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import type { Character } from '../domain/character/type/Character';
import type { CharactersData } from '../domain/character/type/CharacterResponse';
import type { ICharacterRepository } from './ICharacterRepository';
import { GET_ALL_CHARACTERS, GET_CHARACTER_BY_ID, GET_CHARACTERS_BY_NAME } from '../domain/character/type/graphql';

export class GraphQLCharacterRepository implements ICharacterRepository {
    private client: ApolloClient<NormalizedCacheObject>;

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client;
    }

    async getAllCharacters(page?: number): Promise<CharactersData> {
        try {
            const { data } = await this.client.query({
                query: GET_ALL_CHARACTERS,
                variables: { page },
                fetchPolicy: 'cache-first'
            });

            if (!data?.characters) {
                throw new Error('Invalid response format');
            }

            return data.characters;
        } catch (error) {
            console.error('Error fetching all characters:', error);
            throw error;
        }

    }
    async getCharacterByName(name: string, page?: number): Promise<Character | null> {
        try {
            const { data } = await this.client.query({
                query: GET_CHARACTERS_BY_NAME,
                variables: {
                    name,
                    page
                },
                fetchPolicy: 'cache-first'
            });

            if (!data?.characters?.results) {
                return null;
            }

            return data.characters.results.length > 0 ? data.characters.results[0] : null;

        } catch (error) {
            console.error('Error fetching characters by name:', error);
            if (error instanceof Error && (error.message.includes('404') || error.message.includes('There is nothing here'))) {
                return null;
            }
            throw error;
        }
    }
    async getCharacterById(id: string): Promise<Character | null> {
        try {
            const { data } = await this.client.query({
                query: GET_CHARACTER_BY_ID,
                variables: { id },
                fetchPolicy: 'cache-first'
            });

            return data?.character || null;
        } catch (error) {
            console.error('Error fetching character by ID:', error);
            if (error instanceof Error && error.message.includes('404')) {
                return null;
            }
            throw error;
        }

    }

}