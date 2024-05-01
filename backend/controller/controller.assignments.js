let Assignment = require("../model/assignment");
const { ObjectID } = require("bson");
const User = require("../model/user");

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

const getAssignments = async (req, res) => {
  let aggregateQuery = Assignment.aggregate();

  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, data) => {
      if (err) {
        res.send(err);
      }

      res.send(data);
    }
  );
};

// Récupérer un assignment par son id (GET)
const getAssignment = async (req, res) => {
  let assignmentId = req.params.id;
  const assignment = await Assignment.findById(assignmentId).populate("teacher").populate("student");
  res.json(assignment);
};

// Récupérer tous les assignments d'un utilisateur (GET)
const getAssignmentsUtilisateur = (req, res) => {
  if (req.auth.userId) {
    User.findOne({ _id: new ObjectID(req.auth.userId) })
      .then((user) => {
        if (!user) {
          res.json({ message: "Utilisateur introuvable" });
        }
        Assignment.find({ user: user })
          .then((assignmentUser) => {
            res.json(assignmentUser);
          })
          .catch((error) => res.json({ message: "Erreur de traitement" }));
      })
      .catch((error) => res.json({ message: "Erreur de traitement" }));
  } else {
    res.json({ message: "Utilisateur non connecté" });
  }
};

const postAssignment = async (req, res) => {
  if (req.auth.userId) {
    try {
      const foundUser = await User.findOne({ _id: new ObjectID(req.auth.userId) })
        .lean()
        .exec();
      if (!foundUser) {
        res.json({ message: "Utilisateur introuvable" });
      }
      const { _id, ...assignment } = req.body;
      console.log(req.body);
      const created = await Assignment.create(assignment);
      res.json(created);
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.json({ message: "Utilisateur non connecté" });
  }
};

// Update d'un assignment (PUT)
const updateAssignment = (req, res) => {
  if (req.auth.userId) {
    User.findOne({ _id: new ObjectID(req.auth.userId) })
      .then((user) => {
        if (!user) {
          res.json({ message: "Utilisateur introuvable" });
        } else {
          Assignment.findOne({ _id: new ObjectID(req.body._id) })
            .then((check) => {
              if (check) {
                if (check.user[0] == user._id.toString("hex")) {
                  console.log("UPDATE recu assignment : ");
                  console.log(req.body);
                  Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true })
                    .then((resUpdate) => {
                      res.json({ message: "Updated" });
                    })
                    .catch((error) => res.json({ message: "Erreur de traitement" }));
                } else {
                  res.json({ message: "Utilisateur ne peut pas modifier" });
                }
              } else {
                res.json({ message: "Assignment introuvable" });
              }
            })
            .catch((error) => res.json({ message: "Erreur de traitement" }));
        }
      })
      .catch((error) => res.json({ message: "Erreur de traitement" }));
  } else {
    res.json({ message: "Utilisateur non connecté" });
  }
};

// suppression d'un assignment (DELETE)
// l'id est bien le _id de mongoDB
const deleteAssignment = (req, res) => {
  if (req.auth.userId) {
    User.findOne({ _id: new ObjectID(req.auth.userId) })
      .then((user) => {
        if (!user) {
          res.json({ message: "Utilisateur introuvable" });
        } else {
          Assignment.findOne({ _id: req.params.id })
            .then((check) => {
              if (!check) {
                res.json({ message: "Assignment introuvable" });
              } else {
                if (check.user[0] == user._id.toString("hex")) {
                  Assignment.findByIdAndRemove({ _id: new ObjectID(req.params.id) })
                    .then((resFinal) => {
                      res.json({ message: "Deleted" });
                    })
                    .catch((error) => res.json({ message: "Erreur de traitement" }));
                } else {
                  res.json({ message: "Utilisateur ne peut pas supprimer" });
                }
              }
            })
            .catch((error) => res.json({ message: "Erreur de traitement" }));
        }
      })
      .catch((error) => res.json({ message: "Erreur de traitement" }));
  } else {
    res.json({ message: "Utilisateur non connecté" });
  }
};

module.exports = { getAssignments, getAssignmentsUtilisateur, postAssignment, getAssignment, updateAssignment, deleteAssignment };
