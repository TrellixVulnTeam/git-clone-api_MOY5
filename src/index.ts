import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { FileResolver } from './resolvers/FileResolver';
import { HouseKeepingResolver } from './resolvers/HouseKeeping';
import { IssueResolver } from './resolvers/IssueResolver';
import { ProjectResolver } from './resolvers/ProjectResolver';
import { UserResolver } from './resolvers/UserResolver';

(async () => {
  const app = express();
  
  let port = process.env.PORT || 4001;

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ProjectResolver, HouseKeepingResolver, IssueResolver, FileResolver]
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => ({ req, res })
  });

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port );
})();``