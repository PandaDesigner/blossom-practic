import { ApolloClient, createHttpLink, InMemoryCache, type NormalizedCacheObject } from '@apollo/client';
import type { ICharacterRepository } from '../repository/ICharacterRepository';
import { GraphQLCharacterRepository } from '../repository/GraphQLCharacterRepository';


export class CharacterRepositoryFactory {
    private static repository: ICharacterRepository | null = null;
    private static apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

    static create(apiUrl: string): ICharacterRepository {
        if (this.repository) return this.repository;
        const client = this.createApolloClient(apiUrl);
        this.repository = new GraphQLCharacterRepository(client);
        return this.repository;

    }


    private static createApolloClient(uri: string): ApolloClient<NormalizedCacheObject> {
        if (this.apolloClient) return this.apolloClient;
        const httpLink = createHttpLink({ uri });
        this.apolloClient = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: { errorPolicy: 'ignore' },
                query: { errorPolicy: 'all' }
            }
        });
        return this.apolloClient;
    }

}
