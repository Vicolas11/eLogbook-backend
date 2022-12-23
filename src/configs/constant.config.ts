import { IConstant } from "../interfaces/constant.interface";
import { Secret } from "jsonwebtoken";
import { config } from "dotenv";

config();

export const constant: IConstant = {
  expiresIn: "2h",
  refreshIn: "3d",
  secretKey: process.env.SECRET_KEY as string,
  adminAvatar: process.env.ADMIN_AVATAR as string,
  accessToken: process.env.ACCESS_TOKEN as Secret,  
  refreshToken: process.env.REFRESH_TOKEN as Secret,
  cipherSecretKey: process.env.CIPHER_SECRET_KEY as string,
  cryptoSecretKey: process.env.CRYPTO_SECRET_KEY as string,
};
