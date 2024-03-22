const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentification")
const Controller_assignment = require("../controller/controller.assignments")

// http://serveur..../assignments
router.post('/assignments', auth, Controller_assignment.postAssignment);
router.put('/assignments', auth, Controller_assignment.updateAssignment);
router.get('/assignmentsUser', auth, Controller_assignment.getAssignmentsUtilisateur);
router.get('/assignments', auth, Controller_assignment.getAssignments);
router.get('/assignments/:id', auth, Controller_assignment.getAssignment)
router.delete('/assignments/:id', auth, Controller_assignment.deleteAssignment)

module.exports = router;