import { MutationResolvers, UploadResponse } from "../generated";
import readStreamFile from "../../utils/readStream.util";
import deleteFile from "../../utils/deletefile.utils";
import { UserInputError } from "apollo-server-express";

const uploadFileMutation: MutationResolvers = {
  // Upload Files and Return Image URL
  uploadAvatar: async (_, { file }, _ctx) => {

    if (!file) {
      throw new UserInputError("Uploaded an empty file!");
    }  

    const imageURL = await readStreamFile({
      file: file,
      oldImgURL: "",
      action: "create",
      avatar: true,
    });

    return {
      message: "Successfully uploaded!",
      imageUrl: imageURL,
      status: 200,
    } as UploadResponse;
  },

  updateAvatar: async (_, { updateInput }, { prisma }) => {
    const { file, id } = updateInput;
    const user = await prisma.student.findUnique({ where: { id: id } });
    const getFile = await file;
    
    if (!getFile) {
      throw new UserInputError("Uploaded an empty file!");
    }   

    const imageURL = await readStreamFile({
      file: file,
      oldImgURL: user?.avatar || "",
      action: "update",
      avatar: true,
    });

    return {
      message: "Image successfuly updated!",
      imageUrl: imageURL,
      status: 200,
    } as UploadResponse;
  },

  deleteAvatar: async (_, { deleteInput: id }, { prisma }) => {
    const user = await prisma.student.findUnique({ where: { id: id } });
    const isDeleted = await deleteFile(user?.avatar as string, true);
    const message = isDeleted ? "Image successfuly deleted!" : 'Image deleting failed!';
    const status = isDeleted ? 200 : 500;

    return {
      message: message,
      imageUrl: user?.avatar,
      status: status,
    } as UploadResponse;
  },

  // Upload Logbook Diagram
  uploadDiagram: async (_, { file }, _ctx) => {
    const imageURL = await readStreamFile({
      file: file,
      oldImgURL: "",
      action: "create",
      avatar: false,
    });

    return {
      message: "Successfully Uploaded!",
      imageUrl: imageURL,
      status: 200,
    } as UploadResponse;
  },
};

export default uploadFileMutation;
