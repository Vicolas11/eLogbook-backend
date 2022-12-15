"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const titleCase = (str) => {
    let words = str.split(" ");
    let result = "";
    words.map(w => {
        let tc = w[0].toUpperCase() + w.substring(1).toLowerCase();
        result += tc + " ";
    });
    return result.trim();
};
exports.default = titleCase;
//# sourceMappingURL=titlecase.utl.js.map