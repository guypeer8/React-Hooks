import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const apolloClient = new ApolloClient({
    link: createHttpLink({
        uri: `http://localhost:8001/api`,
        credentials: 'include',
    }),
    cache: new InMemoryCache(),
});

const GraphQL = ({ children }) => (
    <ApolloProvider client={apolloClient} >
        {children}
    </ApolloProvider>
);

export default GraphQL;
