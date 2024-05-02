const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentification");
const Controller_subject = require("../controller/controller.subject");

router.get("/subject/:id", Controller_subject.getSubject);
router.get("/subjects", Controller_subject.getSubjects);

module.exports = router;
