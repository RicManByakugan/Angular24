const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentification");
const Controller_subject = require("../controller/controller.subject");

router.get("/subjects", auth, Controller_subject.getSubjects);

module.exports = router;
