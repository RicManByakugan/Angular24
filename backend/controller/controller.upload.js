const path = require("path");
const fs = require("fs");
const FILE_PATH = "./public/files";
const DEFAULT_FILE_PATH = "./public/default";

const uploadFile = async (req, res) => {
  const files = req.files;
  console.log(req);
  if (!files) {
    throw new Error("No file to upload");
  }
  console.log(files);

  const newPaths = files.map((file) => path.normalize(file.path).replace("public", ""));
  res.json(newPaths[0]);
  return newPaths[0];
};

const deleteFile = async (req, res) => {
  const name = req.params.filename;
  fs.unlink(`${IMAGE_PATH}/${name}`, (err) => {
    if (err) {
      throw new Error("Error when deleting file");
    }
  });
  res.send(true);
};

const downloadFile = async (req, res) => {
  console.log(req.params);
  const filename = req.params.filename;
  const filePath = `${filename === "exemple.txt" ? DEFAULT_FILE_PATH : FILE_PATH}/${filename}`;
  fs.exists(filePath, (exists) => {
    if (exists) {
      res.setHeader("Content-disposition", "attachment; filename=" + filepath);
      res.setHeader("Content-type", "application/octet-stream");
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).send(`File not found ${filepath}`);
    }
  });
};

module.exports = { uploadFile, deleteFile, downloadFile };
