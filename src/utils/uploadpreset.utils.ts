import { IType } from "../interfaces/type.interface";

const uploadPreset = ({ type }: IType): string => {
  let preset: string = "";
  switch (type) {
    case "avatar":
      preset = "Avatar";
      break;
    case "diagrams":
      preset = "Diagrams";
      break;
    case "blogposts":
      preset = "Blogposts";
      break;
    case "chats":
      preset = "Chatts";
      break;
    case "logo":
      preset = "Logoss";
      break;
  }
  return preset;
};

export default uploadPreset;
