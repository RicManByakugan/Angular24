const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentification");
const uploadController = require("../controller/controller.upload");
const { upload } = require("../middleware/multer");

router.post("/upload", auth, upload("files"), uploadController.uploadFile);
router.delete("/upload/:filename", auth, uploadController.deleteFile);
router.get("/upload/download/:filename", auth, uploadController.downloadFile);

module.exports = router;
