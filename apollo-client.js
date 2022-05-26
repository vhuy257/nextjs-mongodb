import { 
    ApolloClient, 
    InMemoryCache 
} from "@apollo/client";

const grapqlUri = `https://countries.trevorblades.com`;

const client = new ApolloClient({
    uri: grapqlUri,
    cache: new InMemoryCache(),
});

export default client;