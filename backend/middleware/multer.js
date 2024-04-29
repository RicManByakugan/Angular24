const fs = require("fs");
const multer = require("multer");
const PATH = "./public/files";

const upload = (filePrefix = "file") =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const dir = PATH;
        fs.exists(dir, (exist) => {
          if (!exist) {
            return fs.mkdir(dir, (error) => cb(error, dir));
          }
          return cb(null, dir);
        });
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }).array(filePrefix, 10);

module.exports = { upload };
