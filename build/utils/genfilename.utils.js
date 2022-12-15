"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateUniqueFilename = (type) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = date.getTime();
    let ty = '';
    switch (type) {
        case "avatar":
            ty = "AVT";
            break;
        case "diagrams":
            ty = "DIA";
            break;
        case "blogposts":
            ty = "BLO";
            break;
        case "chats":
            ty = "IMG";
            break;
        case "logo":
            ty = "LOG";
            break;
        default:
            ty = "";
    }
    const fullDay = day >= 10 ? day : "0" + `${day}`;
    const fullMonth = month >= 10 ? month : "0" + `${month}`;
    const genDate = `${ty}-${year}${fullMonth}${fullDay}-${time}.jpg`;
    return genDate;
};
exports.default = generateUniqueFilename;
//# sourceMappingURL=genfilename.utils.js.map