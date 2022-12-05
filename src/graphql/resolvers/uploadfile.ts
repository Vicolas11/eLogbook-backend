import {
  AuthenticationError,
  UserInputError,
  ValidationError,
} from "apollo-server-express";
import {
  FileDelInputSchema,
  FileInputSchema,
  FileUpdateInputSchema,
} from "../../joi/uploadfile.joi";
import { Logbook, MutationResolvers, UploadResponse } from "../generated";
import readStreamFile from "../../utils/readStream.util";
import { decryptToken } from "../../utils/crypto.utils";
import deleteFile from "../../utils/deletefile.utils";
import { envConfig } from "../../configs/env.config";
import getUser from "../../utils/getuser.util";

const { default_img } = envConfig;

const uploadFileMutation: MutationResolvers = {
  // CREATE UPDATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  uploadFile: async (_, { input }, _ctx) => {
    const { file, type } = input;

    // Validate Input field
    const validate = FileInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    const getFile = await input.file;
    if (!getFile) {
      throw new UserInputError("Uploaded an empty file!");
    }

    const imageURL = await readStreamFile({
      file: file,
      oldImgURL: "",
      action: "create",
      subpath: type,
    });

    return {
      message: "Successfully uploaded!",
      imageUrl: imageURL,
      status: 200,
    } as UploadResponse;
  },

  // UPDATE FILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateFile: async (_, { updateInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { id: loginUserId, role } = user;

    // Authenticate user
    if (!user || loginUserId === "" || role === "")
      throw new AuthenticationError("User not authenticated!");

    const { file, id, type, actId } = input;

    // Validate Input field
    const validate = FileUpdateInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    let userExist: any | null;
    let logbook: any | undefined;

    if (type === "diagrams") {
      // Update Logbook Diagram
      const studLogbook = await prisma.student.findUnique({
        where: { id: loginUserId },
        include: { logbooks: true },
      });
      logbook = studLogbook?.logbooks.find((i) => i.actId === actId);
    } else {
      // Update Users Avatar / Organisation Logo
      const loginUserRole = role.toLowerCase();
      userExist = await prisma[loginUserRole].findUnique({
        where: { id: loginUserId },
      });
      if (!userExist) throw new AuthenticationError("User doesn't exist!");
    }

    const getFile = await file;
    if (!getFile) throw new AuthenticationError("Uploaded an empty file!");

    if (loginUserId !== id)
      throw new AuthenticationError("Not authorized: Not a genuine user!");

    const imageURL = await readStreamFile({
      file: file,
      oldImgURL:
        userExist?.avatar === default_img
          ? ""
          : userExist?.avatar || userExist?.logo || logbook?.diagram,
      action: "update",
      subpath: type,
    });

    return {
      message: "Image successfuly updated!",
      imageUrl: imageURL,
      status: 200,
    } as UploadResponse;
  },

  // DELETE FILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteFile: async (_, { deleteInput }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { id: loginUserId, role } = user;

    // Authenticate user
    if (!user || loginUserId === "" || role === "")
      throw new AuthenticationError("User not authenticated!");

    const { id, type, actId } = deleteInput;  
    
    // Validate Input field
    const validate = FileDelInputSchema.validate(deleteInput);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    let userExist: any | null;
    let logbook: any | undefined;

    if (type === "diagrams") {
      // Delete Logbook Diagram
      const studLogbook = await prisma.student.findUnique({
        where: { id: loginUserId },
        include: { logbooks: true },
      });
      logbook = studLogbook?.logbooks.find((i) => i.actId === actId);
    } else {
      const loginUserRole = role.toLowerCase();
      const userExist = await prisma[loginUserRole].findUnique({
        where: { id: loginUserId },
      });

      if (!userExist) throw new AuthenticationError("User doesn't exist!");
    }

    // Authorized user, if is Genuine
    if (loginUserId !== id)
      throw new AuthenticationError("Not authorized: Not a genuine user!");

    let status: number = 500;
    let message: string = "";
    let subpath: string = "";

    if (userExist?.avatar) {
      subpath = "avatar";
    } else if (userExist?.logo) {
      subpath = "logo";
    } else if (logbook?.diagram) {
      subpath = "diagrams";
    }

    if (userExist?.avatar !== default_img || logbook?.diagram) {
      const isDeleted = await deleteFile(
        userExist?.avatar || userExist?.logo || logbook?.diagram,
        subpath
      );
      message = isDeleted
        ? "Image successfuly deleted!"
        : "Image deleting failed!";
      status = isDeleted ? 200 : 500;
    }    

    return {
      message: userExist?.avatar === default_img || !logbook?.diagram ? "Successful" : message,
      imageUrl: userExist?.avatar || userExist?.logo || logbook?.diagram,
      status: userExist?.avatar === default_img || !logbook?.diagram ? 200 : status,
      actId
    } as UploadResponse;
  },
};

export default uploadFileMutation;
