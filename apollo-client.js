import { 
    ApolloClient, 
    HttpLink,
    InMemoryCache 
} from "@apollo/client";

const grapqlUri = `/api/graphql`;

const client = new ApolloClient({
    link: new HttpLink({
        uri: grapqlUri
    }),
    cache: new InMemoryCache(),
});

export default client;