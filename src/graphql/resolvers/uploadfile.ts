import { MutationResolvers, UploadResponse } from "../generated";
import readStreamFile from "../../utils/readStream.util";

const uploadFileMutation: MutationResolvers = {
// Upload Files and Return Image URL
uploadAvatar: async (_, { file }, _ctx) => {    
    const imageURL = await readStreamFile(file, true);
    return {
      message: "Successfully Uploaded!",
      imageUrl: imageURL,
      status: 200
    } as UploadResponse
  },
  
  // Upload Logbook Diagram
  uploadDiagram: async (_, { file }, _ctx) => {    
    const imageURL = await readStreamFile(file, false);
    return {
      message: "Successfully Uploaded!",
      imageUrl: imageURL,
      status: 200
    } as UploadResponse
  },
}

export default uploadFileMutation;