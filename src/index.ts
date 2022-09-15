import express, { Application, Request, Response } from "express";
import { startApolloServer } from "./graphql/index.graphql";
import { envConfig } from "./configs/env.config";
import cookieParser from "cookie-parser";
import compression from "compression";
import { config } from "dotenv";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";

config();

(async () => {
  const app: Application = express();

  // Prevent Cross-site Scripting Attack
  app.use(xss());

  // Enables Cross-Origin Resource Sharing for various methods(POST,GET...)
  app.use(cors());

  // Parses incoming requests with JSON payloads
  app.use(express.json({ limit: "1MB" }));

  // Parses incoming requests with urlencoded payloads
  app.use(express.urlencoded({ extended: true }));

  // Compress response bodies for every request
  app.use(compression());

  // Parse Cookies
  app.use(cookieParser());

  // Add secure HTTP headers
  app.use(
    helmet({
      crossOriginEmbedderPolicy: !envConfig.dev,
      contentSecurityPolicy: !envConfig.dev,
    })
  );

  app.get("/", (_req: Request, res: Response) => {
    res.send('<h1 style="text-align: center;">Server is Ready 👌!</h1>');
    // res.status(200).send(JSON.stringify({ message: "Server is ready 👌!" }));
  });

  // Start Apollo Server
  startApolloServer(app);
})();
