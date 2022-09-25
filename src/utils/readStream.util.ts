import generateUniqueFilename from "./genfilename.utils";
import { UserInputError } from "apollo-server-express";
import { envConfig } from "../configs/env.config";
import checkFileSize from "./checkfile.util";
import { createWriteStream } from "fs";
import { config } from "dotenv";
import { join } from "path";

config();

const readStreamFile = async (inputField: any, avatar: boolean): Promise<string> => {
  const { port, dev, url } = envConfig;
  const { createReadStream } = await inputField;

  // Check File size is not more than 1MB
  try {
    const oneMB: number = 1000000 // 1MB
    await checkFileSize(createReadStream, oneMB)
  } catch (error) {
    if (typeof error === 'number') {
      throw new UserInputError('Maximum file size is 1MB!');
    }
  }
  
  const stream = createReadStream();
  const unqueFilename = generateUniqueFilename(true);
  const subpath = avatar ? "avatar" : "diagram";
  const pathname = join(__dirname, `../../public/upload/${subpath}/${unqueFilename}`);
  const imageStream = createWriteStream(pathname);
  stream.pipe(imageStream);
  
  const URL = `${url}${port}/${subpath}/${unqueFilename}`;
  return URL;
};

export default readStreamFile;
