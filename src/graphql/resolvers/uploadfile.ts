import { FileInputSchema, FileUpdateInputSchema } from "../../joi/uploadfile.joi";
import { UserInputError, ValidationError } from "apollo-server-express";
import { MutationResolvers, UploadResponse } from "../generated";
import readStreamFile from "../../utils/readStream.util";
import deleteFile from "../../utils/deletefile.utils";

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
  updateFile: async (_, { updateInput: input }, { prisma }) => {
    const { file, id, type } = input;

    // Validate Input field
    const validate = FileUpdateInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    const user = await prisma.student.findUnique({ where: { id: id } });
    const getFile = await file;
    if (!getFile) {
      throw new UserInputError("Uploaded an empty file!");
    }

    const imageURL = await readStreamFile({
      file: file,
      oldImgURL: user?.avatar || "",
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
  deleteFile: async (_, { deleteInput: id }, { prisma }) => {
    const user = await prisma.student.findUnique({ where: { id: id } });
    const isDeleted = await deleteFile(user?.avatar as string, true);
    const message = isDeleted
      ? "Image successfuly deleted!"
      : "Image deleting failed!";
    const status = isDeleted ? 200 : 500;

    return {
      message: message,
      imageUrl: user?.avatar,
      status: status,
    } as UploadResponse;
  },
};

export default uploadFileMutation;
