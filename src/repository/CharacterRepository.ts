import { gql, type ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import type { CharacterListResponse, ICharacterRepository } from '../domain/character/type/ICharacterRepository';
import type { ActiveFilters, CharacterFilters } from '../domain/character/type/CharacterFilters';


export class CharacterRepository implements ICharacterRepository {
    private client: ApolloClient<NormalizedCacheObject>;

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client;
    }

    private mapFiltersToActiveFilters(filters: CharacterFilters): ActiveFilters {
        const activeFilters: ActiveFilters = {};

        if (filters.name) activeFilters.name = filters.name;
        if (filters.status && filters.status !== 'ALL') activeFilters.status = filters.status;
        if (filters.species && filters.species !== 'ALL') activeFilters.species = filters.species;
        if (filters.gender && filters.gender !== 'ALL') activeFilters.gender = filters.gender;
        if (filters.type) activeFilters.type = filters.type;

        return activeFilters;
    }


    async getCharacters(filters: CharacterFilters): Promise<CharacterListResponse> {
        try {
            const activeFilters = this.mapFiltersToActiveFilters(filters);

            const { data } = await this.client.query<{ characters: CharacterListResponse }>({
                query: gql`
                    query Characters($page: Int, $name: String, $status: String, $species: String, $gender: String, $type: String) {
                        characters(page: $page, filter: { name: $name, status: $status, species: $species, gender: $gender, type: $type }) {
                            results {
                                id
                                name
                                image
                                species
                                status
                                gender
                                type
                                origin {
                                    name
                                    url
                                }
                                location {
                                    name
                                    url
                                }
                                episode
                                url
                                created
                            }
                            info {
                                count
                                pages
                                next
                                prev
                            }
                        }
                    }
                `,
                variables: {
                    page: 1,
                    ...activeFilters,
                },
            });


            return {
                results: data.characters.results,
                info: data.characters.info,
            };
        } catch (error) {
            console.error("Error fetching characters:", error);
            throw error;
        }
    }
}
