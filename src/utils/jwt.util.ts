import { constant } from "../configs/constant.config";
import jwt, { JwtPayload } from "jsonwebtoken";

const { accessToken, expiresIn, refreshToken, refreshIn } = constant;

export const signAccessJWToken = async (
  payload: JwtPayload
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, accessToken, { expiresIn: expiresIn }, (error, token) => {
      if (error) reject(error);
      resolve(token as string);
    });
  });
};

export const signRefreshJWToken = async (payload: JwtPayload): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      refreshToken,
      { expiresIn: refreshIn },
      (error, token) => {
        if (error) reject(error);
        resolve(token as string);
      }
    );
  });
};

export const verifyAccessJWToken = async (token: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(token, accessToken, (error, decode) => {
      if (error) reject(error);
      resolve(decode as string);
    });
  });
};

export const verifyRefreshJWToken = async (token: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(token, refreshToken, (error, decode) => {
      if (error) reject(error);
      resolve(decode as string);
    });
  });
};
