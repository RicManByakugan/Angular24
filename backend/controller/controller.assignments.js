let Assignment = require("../model/assignment");
const { ObjectID } = require("bson");
const User = require("../model/user");
const { buildSearch } = require("../utils/search");

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
  const { page, limit, userId, search } = req.query;
  const additionalCriteria = {
    student: new ObjectID(userId),
  };
  const searchFields = ["title", "subject"];
  const criteria = buildSearch(searchFields, search, additionalCriteria);

  let aggregateQuery = Assignment.aggregate();
  aggregateQuery.match(criteria);

  const assignments = await Assignment.aggregatePaginate(aggregateQuery, {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
  });
  res.send(assignments);
};

// Récupérer un assignment par son id (GET)
const getAssignment = async (req, res) => {
  let assignmentId = req.params.id;
  const assignment = await Assignment.findById(assignmentId).populate("teacher").populate("student").populate('subject');
  res.json(assignment);
};

// Récupérer tous les assignments d'un utilisateur (GET)
const getAssignmentsUtilisateur = (req, res) => {
  if (req.auth.userId) {
    User.findOne({ _id: new ObjectID(req.auth.userId) }).populate('subject')
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

// Récupérer tous les assignments d'un utilisateur (GET)
const getAssignmentsSubject = async (req, res) => {
  if (req.params.subject) {
    const assignments = await Assignment.find({ subject: req.params.subject }).populate("student").populate("teacher").populate('subject');
    res.json(assignments);
  } else {
    res.json({ message: "Paramètre incomplète" });
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

const rendreAssignment = async (req, res) => {
  const { _id, ...assignment } = req.body;
  if (req.auth.userId) {
    await Assignment.findByIdAndUpdate(_id, { $set: assignment }, { new: true });
    res.json({ message: "Devoir rendu" });
  } else {
    res.status = 401;
    res.json({ message: "Utilisateur non connecté" });
  }
};

const getAssigmentsByUser = async (req, res) => {
  const userId = req.param;
  if (userId) {
    const user = await User.findOne({ _id: new ObjectID(req.auth.userId) }).populate("subject");
    if (user) {
      if (user.role == "STUDENT") {
        res.json({ data: [], message: "Utilisateur etudiant" });
      }else{
        const assignments = await Assignment.find({ subject: user.subject.type });
        res.json({ data: assignments });
      }
    } else {
      res.status = 404;
      res.json({ message: "Utilisateur non trouvé" });
    }
  } else {
    res.status = 400;
    res.json({ message: "Requête incorrecte" });
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

module.exports = {
  getAssignments,
  getAssignmentsUtilisateur,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentsSubject,
  rendreAssignment,
  getAssigmentsByUser,
};
