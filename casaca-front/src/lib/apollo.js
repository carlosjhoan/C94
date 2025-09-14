import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import config from '../config';

const httpLink = new HttpLink({
    uri: `${config.strapiApiUrl}/graphql`,
    headers: {
        authorization: `Bearer ${config.strapiApiToken}`, // Add the authorization header directly here
    },
});

const client = new ApolloClient({
    link: httpLink, // No need to combine links anymore!
    cache: new InMemoryCache(),
});

export default client;