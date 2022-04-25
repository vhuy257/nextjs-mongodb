import { 
    ApolloClient, 
    HttpLink,
    InMemoryCache 
} from "@apollo/client";

export const  APP_ID = "application-0-mggtt";

const grapqlUri = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;

const client = new ApolloClient({
    link: new HttpLink({
        uri: grapqlUri
    }),
    cache: new InMemoryCache(),
});

export default client;