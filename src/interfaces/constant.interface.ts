import { Secret } from "jsonwebtoken";

export interface IConstant {
  accessToken: Secret;
  refreshToken: Secret;
  cipherSecretKey: string;
  expiresIn: string;
  refreshIn: string;
}
