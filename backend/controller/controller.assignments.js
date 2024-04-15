let Assignment = require('../model/assignment');
const { ObjectID } = require("bson")
const User = require('../model/user');

// Récupérer tous les assignments (GET)
/*
const getAssignments = (req, res){ =>
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}
*/

const getAssignments = (req, res) => {
    let aggregateQuery = Assignment.aggregate();

    Assignment.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        },
        (err, data) => {
            if (err) {
                res.send(err)
            }

            res.send(data);
        }
    );
}

// Récupérer un assignment par son id (GET)
const getAssignment = (req, res) => {
    let assignmentId = req.params.id;
    Assignment.findById(assignmentId, (err, assignment) => {
        if (err) { res.send(err) }
        res.json(assignment);
    })

    /*
    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
    */
}

// Récupérer tous les assignments d'un utilisateur (GET)
const getAssignmentsUtilisateur = (req, res) => {
    if (req.auth.userId) {
        User.findOne({ _id: new ObjectID(req.auth.userId) })
            .then((user) => {
                if (!user) {
                    res.json({ message: "Utilisateur introuvable" })
                }
                Assignment.find({ user: user })
                    .then((assignmentUser) => {
                        res.json(assignmentUser)
                    })
                    .catch(error => res.json({ message: "Erreur de traitement" }))
            })
            .catch(error => res.json({ message: "Erreur de traitement" }))
    } else {
        res.json({ message: "Utilisateur non connecté" })
    }
}

// Ajout d'un assignment (POST)
const postAssignment = (req, res) => {
    if (req.auth.userId) {
        User.findOne({ _id: new ObjectID(req.auth.userId) })
            .then((user) => {
                if (!user) {
                    res.json({ message: "Utilisateur introuvable" })
                }
                let assignment = new Assignment();
                assignment.id = req.body.id;
                assignment.nom = req.body.nom;
                assignment.dateDeRendu = req.body.dateDeRendu;
                assignment.rendu = false;
                assignment.user = user;

                console.log("POST assignment reçu :");
                console.log(assignment)

                assignment.save((err) => {
                    if (err) {
                        res.send('cant post assignment ', err);
                    }
                    res.json({ message: `${assignment.nom} saved!` })
                })
            })
            .catch(error => res.json({ message: "Erreur de traitement" }))
    } else {
        res.json({ message: "Utilisateur non connecté" })
    }
}

// Update d'un assignment (PUT)
const updateAssignment = (req, res) => {
    if (req.auth.userId) {
        User.findOne({ _id: new ObjectID(req.auth.userId) })
            .then((user) => {
                if (!user) {
                    res.json({ message: "Utilisateur introuvable" })
                } else {
                    Assignment.findOne({ _id: new ObjectID(req.body._id) })
                        .then(check => {
                            if (check) {
                                if (check.user[0] == user._id.toString('hex')) {
                                    console.log("UPDATE recu assignment : ");
                                    console.log(req.body);
                                    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true })
                                        .then(resUpdate => {
                                            res.json({ message: 'Updated' })
                                        })
                                        .catch(error => res.json({ message: "Erreur de traitement" }))
                                } else {
                                    res.json({ message: "Utilisateur ne peut pas modifier" })
                                }
                            } else {
                                res.json({ message: "Assignment introuvable" })
                            }
                        })
                        .catch(error => res.json({ message: "Erreur de traitement" }))
                }
            })
            .catch(error => res.json({ message: "Erreur de traitement" }))
    } else {
        res.json({ message: "Utilisateur non connecté" })
    }

}

// suppression d'un assignment (DELETE)
// l'id est bien le _id de mongoDB
const deleteAssignment = (req, res) => {
    if (req.auth.userId) {
        User.findOne({ _id: new ObjectID(req.auth.userId) })
            .then((user) => {
                if (!user) {
                    res.json({ message: "Utilisateur introuvable" })
                } else {
                    Assignment.findOne({ _id: req.params.id })
                        .then(check => {
                            if (!check) {
                                res.json({ message: "Assignment introuvable" })
                            } else {
                                if (check.user[0] == user._id.toString('hex')) {
                                    Assignment.findByIdAndRemove({_id: new ObjectID(req.params.id)})
                                        .then(resFinal => {
                                            res.json({ message: "Deleted" })
                                        })
                                        .catch(error => res.json({ message: "Erreur de traitement" }));
                                } else {
                                    res.json({ message: "Utilisateur ne peut pas supprimer" })
                                }
                            }
                        })
                        .catch(error => res.json({ message: "Erreur de traitement" }))
                }
            })
            .catch(error => res.json({ message: "Erreur de traitement" }))
    } else {
        res.json({ message: "Utilisateur non connecté" })
    }
}



module.exports = { getAssignments, getAssignmentsUtilisateur, postAssignment, getAssignment, updateAssignment, deleteAssignment };
