import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
// import { graphqlUploadExpress } from 'graphql-upload';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { ApolloServer } from "apollo-server-express";
import { envConfig } from "../configs/env.config";
import { PrismaClient } from "@prisma/client";
import depthLimit from "graphql-depth-limit";
import type { Application } from "express";
import context from "./context";
import schema from "./schema";
import http from "http";

export const startApolloServer = async (app: Application) => {
  // Test Prisma Connection
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log("\x1b[32m%s\x1b[0m", "😎 Prisma connected to database");
  } catch (err) {
    console.log("\x1b[31m%s\x1b[0m", "😔 Prisma failed to connect database");
  }

  const { port } = envConfig;
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    validationRules: [depthLimit(5)]
  });
  

  // This middleware must come before ApplyMiddleware method below
  app.use(graphqlUploadExpress());

  await server.start();

  server.applyMiddleware({ app, path: "/api/graphql" });

  // Throw unhandled rejection to a fallback handler
  process.on("unhandledRejection", (reason: Error) => {
    console.log("\x1b[31m%s\x1b[0m", `Unhandled Rejection: ${reason}`);
    throw reason;
  });

  // Kill app if there's an uncaught exception
  process.on("uncaughtException", (error: Error) => {
    console.log("\x1b[31m%s\x1b[0m", `UncaughtException Error: ${error}`);
    process.exit(1);
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
  console.log(`🚀 HTTP Server ready at http://localhost:${port}`);
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};
