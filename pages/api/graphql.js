import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { connectToDatabase } from '../../lib/mongodb';
import { TaskCollectionName } from '../../lib/constant';

const { db } = await connectToDatabase();

const typeDefs = gql`
  type Task {
    id: ID,
    summary: String
  }

  type Query {
    getTasks: Task
  }
`;

const resolvers = {
  Query: {
    getTasks: async() => {
      return await db.collection(TaskCollectionName).find({}).limit(20).toArray();
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};