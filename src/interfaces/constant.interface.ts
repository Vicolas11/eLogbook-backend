import { Secret } from "jsonwebtoken";

export interface IConstant {
  accessToken: Secret;
  refreshToken: Secret;
  secretKey: string;
  expiresIn: string;
  refreshIn: string;
}
