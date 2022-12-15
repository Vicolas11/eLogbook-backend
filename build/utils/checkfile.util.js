"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// function to check if the size of the file is permitted
const checkFileSize = (createReadStream, maxSize) => new Promise((resolves, rejects) => {
    let filesize = 0;
    let stream = createReadStream();
    stream.on('data', (chunk) => {
        filesize += chunk.length;
        if (filesize > maxSize) {
            rejects(filesize);
        }
    });
    stream.on('end', () => resolves(filesize));
    stream.on('error', rejects);
});
exports.default = checkFileSize;
//# sourceMappingURL=checkfile.util.js.map