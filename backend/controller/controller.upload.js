const path = require("path");
const fs = require("fs");
const FILE_PATH = "../public/files";
const DEFAULT_FILE_PATH = "../public/default";

const uploadFile = async (req, res) => {
  const files = req.files;
  if (!files) {
    throw new Error("No file to upload");
  }

  const newPaths = files.map((file) => {
    const adjustedTargetPath = path.join(__dirname, "..", file.path.replace("public", ""));
    return adjustedTargetPath;
  });

  res.json(newPaths[0]);
  return newPaths[0];
};

const deleteFile = async (req, res) => {
  const name = req.params.filename;
  fs.unlink(`${__dirname}/${IMAGE_PATH}/${name}`, (err) => {
    if (err) {
      throw new Error("Error when deleting file");
    }
  });
  res.send(true);
};

const downloadFile = async (req, res) => {
  const filename = req.params.filename;
  const targetPath = filename === "exemple.txt" ? DEFAULT_FILE_PATH : FILE_PATH;
  const filePath = path.join(__dirname, targetPath, filename);
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
