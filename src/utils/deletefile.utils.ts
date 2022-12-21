import fileRemover from "./fileremove.util";

const deleteFile = async (oldImgURL: string, subpath: string) => {
  // const subpath = avatar ? "avatar" : "diagram";
  const imgURL = oldImgURL.split("/");
  const lastIdx = imgURL.length - 1;
  const filepath = imgURL[lastIdx];
  // Remove File Locally
  const isRemoved = await fileRemover({filepath, subpath });
  if (isRemoved) return true;
};

export default deleteFile;
