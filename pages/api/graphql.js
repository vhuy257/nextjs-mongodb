import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { connectToDatabase } from "../../lib/mongodb";
import { TaskCollectionName } from "../../lib/constant";

const typeDefs = gql`
  type Task {
    _id: ID,
    summary: String,
    isComplete: Boolean,
    selected: Boolean,
  }

  type Query {
    getTasks: [Task]
  }
`;

const getListTask = async() => {
  const { db } = await connectToDatabase();
  try {
      return await db.collection(TaskCollectionName).find({}).toArray(); 
  } catch (error) {
      return error;
  }
}

const resolvers = {
  Query: {
    getTasks: async() => {
      return await getListTask()
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