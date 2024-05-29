require("dotenv").config();
const path = require("path");
const fs = require("fs");
const FILE_PATH = process.env.FILE_PATH;
const DEFAULT_FILE_PATH = process.env.DEFAULT_FILE_PATH;
const env = process.env.ENV;

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

const list = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    // Log the files in the directory
    console.log("Files in directory:");
    files.forEach((file) => {
      console.log(file);
    });
  });
};

const downloadFile = async (req, res) => {
  console.log(env);
  const filename = req.query.filepath.split("/").at(-1);

  const filePath = `${filename === "exemple.txt" ? DEFAULT_FILE_PATH : FILE_PATH}/${filename}`;
  list("/opt/render/project/src/backend");
  fs.exists(filePath, (exists) => {
    if (exists) {
      res.setHeader("Content-disposition", "attachment; filename=" + filename);
      res.setHeader("Content-type", "application/octet-stream");
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).send(`File not found ${filePath}`);
    }
  });
};

module.exports = { uploadFile, deleteFile, downloadFile };
