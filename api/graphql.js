import { ApolloServer } from "apollo-server-micro";
import mongoose from "mongoose";
import Cors from "micro-cors";

import { typeDefs } from "./schema/type-defs.js";
import { resolvers } from "./schema/resolvers.js";
import { send } from "micro";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

const cors = Cors();

export default server.start().then(() => {
  const handler = server.createHandler({ path: "/api/graphql" });
  return cors((req, res) => {
    req.method === "OPTIONS" ? send(res, 200, "ok") : handler(req, res);
  });
});
