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
  const filePath = `${FILE_PATH}/${filename}`;
  console.log(filePath);
  fs.exists(filePath, (exists) => {
    if (exists) {
      res.setHeader("Content-disposition", "attachment; filename=" + filename);
      res.setHeader("Content-type", "application/octet-stream");
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).send("File not found");
    }
  });
};

module.exports = { uploadFile, deleteFile, downloadFile };
