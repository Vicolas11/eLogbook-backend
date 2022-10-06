import { IJWTCustom } from "../interfaces/jwtcustom.interface";
import { AuthenticationError } from "apollo-server-express";
import { constant } from "../configs/constant.config";
import jwt from "jsonwebtoken";

const getUser = (auth: string) => {
  const { secretKey } = constant;
  let id = "";
  let email = "";
  let role = "";

  if (!auth || auth === "")
    throw new AuthenticationError("Not authentication!");

  const bearer = auth.split(" ")[0];
  const token = auth.split(" ")[1];

  if ((bearer !== "Bearer" && bearer !== "Token") || token === "")
    throw new AuthenticationError("Not authentication!");

  try {
    const decode = jwt.verify(token, secretKey) as IJWTCustom;
    id = decode.id && decode.id;
    email = decode.email && decode.email;
    role = decode.role && decode.role;
  } catch (err) {
    throw new AuthenticationError(`${err}`);
  }

  return {
    id,
    email,
    role,
  };
};

export default getUser;
