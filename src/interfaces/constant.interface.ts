import { Secret } from "jsonwebtoken";

export interface IConstant {
  secretKey: string;
  expiresIn: string;
  refreshIn: string;
  adminAvatar: string;
  accessToken: Secret;
  refreshToken: Secret;
  cryptoSecretKey: string;
  cipherSecretKey: string;
  
}
