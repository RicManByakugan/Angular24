const express = require('express');
const router = express.Router();
const Controller_assignment = require("../controller/controller.assignments")

// http://serveur..../assignments
router.post('/assignments', Controller_assignment.postAssignment);
router.put('/assignments', Controller_assignment.updateAssignment);
router.get('/assignments', Controller_assignment.getAssignments);
router.get('/assignments/:id', Controller_assignment.getAssignment)
router.delete('/assignments/:id', Controller_assignment.deleteAssignment)

module.exports = router;