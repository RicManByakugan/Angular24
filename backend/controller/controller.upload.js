const path = require("path");
const fs = require("fs");
const FILE_PATH = "./public/files";

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
  const name = req.param;
  fs.unlink(`${IMAGE_PATH}/${name}`, (err) => {
    if (err) {
      throw new Error("Error when deleting file");
    }
  });
  res.send(true);
};

module.exports = { uploadFile, deleteFile };
