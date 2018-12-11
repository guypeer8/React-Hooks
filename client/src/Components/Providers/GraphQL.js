import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

export const apolloClient = new ApolloClient({
    uri: `http://localhost:8001/api`,
});

const GraphQL = ({ children }) => (
    <ApolloProvider client={apolloClient} >
        {children}
    </ApolloProvider>
);

export default GraphQL;
