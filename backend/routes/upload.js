const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentification");
const uploadController = require("../controller/controller.upload");
const { upload } = require("../middleware/multer");

router.post("/upload", auth, upload("files"), uploadController.uploadFile);
router.delete("/upload/:fileName", auth, uploadController.deleteFile);

module.exports = router;
