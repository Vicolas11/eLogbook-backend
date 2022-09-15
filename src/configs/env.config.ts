import { config } from "dotenv";
import { IEnvConfig } from "../interfaces/env.interface";

config();

const ENV = (process.env.NODE_ENV as string) || "development";

export const envConfig: IEnvConfig = {
  port: +(process.env.APP_PORT as unknown as number) || 5000,
  dev: ENV === "development",
  prod: ENV === "production",
  test: ENV === "test",
};
