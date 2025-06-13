import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { ReactNode } from 'react'
import { env } from '../../env'

const client = new ApolloClient({
    uri: env.VITE_RICK_AND_MORTY_API_URL,
    cache: new InMemoryCache(),
})

export const ProviderApollo = ({ children }: { children: ReactNode }) => {

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}