import { envConfig } from "../configs/env.config";
import cloudinary from "cloudinary";

const { cloud_name, api_key, api_secret } = envConfig;

cloudinary.v2.config({
  api_key,
  api_secret,
  cloud_name
});

export const deleteCloudinary = (imgURL: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
        const splitedURL = imgURL?.split("/");
        const folder = splitedURL[7];
        const fileName = splitedURL[8].split(".")[0];
        const public_id = `${folder}/${fileName}`;

        const destroy = cloudinary.v2.uploader.destroy(public_id);
        const response = await destroy;
        resolve(response?.result);
    } catch (err) {
      return reject(err);
    }
  });
};
