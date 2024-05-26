const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentification");
const Controller_assignment = require("../controller/controller.assignments");

// http://serveur..../assignments
router.post("/assignments", auth, Controller_assignment.postAssignment);
router.put("/assignments/rendre/:id", auth, Controller_assignment.rendreAssignment);
router.put("/assignments/:id", auth, Controller_assignment.updateAssignment);
router.get("/assignments/User", auth, Controller_assignment.getAssignmentsUtilisateur);
router.get("/assignments/Subject/:subject", auth, Controller_assignment.getAssignmentsSubject);
router.get("/assignments", Controller_assignment.getAssignments);
router.get("/assignments/:id", Controller_assignment.getAssignment);
router.delete("/assignments/:id", auth, Controller_assignment.deleteAssignment);
router.get("/assignments/user/:id", auth, Controller_assignment.getAssigmentsByUser);

module.exports = router;
