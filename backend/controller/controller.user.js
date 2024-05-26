const User = require("../model/user");
const { ObjectID } = require("bson");
const { SendMail } = require("../utils/mail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// UTILISATEUR CONNECTEE
const utilisateur_actif = (req, res) => {
  if (req.auth.userId) {
    User.findOne({ _id: new ObjectID(req.auth.userId) })
      .populate('subject')
      .then((user) => {
        if (!user) {
          res.json({ message: "Utilisateur introuvable" });
        }
        res.json({ useractif: user });
      })
      .catch((error) => res.status(200).json({ message: "Utilisateur invalide" }));
  } else {
    res.json({ message: "Token invalide" });
  }
};

// INSCRIPTION UTILISATEUR
// data : email, password, role, nom, prenom, subject
const inscription = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(201).json({ message: "Email déjà utilisé" });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            const userData = {
              email: req.body.email,
              role: req.body.role,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              password: hash,
            };
            if (req.body.role === "TEACHER") {
              userData.subject = req.body.subject;
            }
            const user = new User(userData);
            user
              .save()
              .then(() => res.status(201).json({ message: "Utilisateur créé" }))
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// CONNEXION UTILISATEUR
const connexion = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(200).json({ message: "Email ou mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(200).json({ message: "Email ou mot de passe incorrecte" });
          }
          res.status(200).json({
            message: "Utilisateur connecté",
            userId: user._id,
            role: user.role,
            token: jwt.sign({ userId: user._id }, "KEY_ANGULAR_24", { expiresIn: "3600s" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


// VERIFICATION EMAIL UTILISATEUR
const verification = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(200).json({ message: "Email ou mot de passe incorrecte" });
      } else {
        const validationCode = Math.floor(10000 + Math.random() * 90000);
        user.code = validationCode;
        user.save()
          .then(() => {
            const subject = 'Mot de passe oublié';
            const content = `Votre code de validation est : ${validationCode}`;
            const DataHTML = `<p>Votre code de validation est : <strong>${validationCode}</strong></p>`;
            SendMail(user.email, subject, content, DataHTML)
              .then(() => {
                res.status(200).json({ message: "Code envoyé" });
              })
              .catch((error) => {
                console.error("Erreur d'envoi de l'email : ", error);
                res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
              });
          })
          .catch((error) => {
            console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
          });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// VERIFICATION CODE UTILISATEUR
const verificationCode = (req, res) => {
  const { email, code } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé" });
      }
      if (user.code === parseInt(code, 10)) {
        user.code = null;
        user.codeVerifier = true;
        user.save()
          .then(() => {
            res.status(200).json({ message: "Code vérifié avec succès" });
          })
          .catch((error) => {
            console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
          });
      } else {
        res.status(400).json({ message: "Code de validation incorrect" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// NOUVEAU MOT DE PASSE UTILISATEUR
const resetpass = (req, res) => {
  const { email, newPassword } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé" });
      }
      if (!user.codeVerifier) {
        return res.status(400).json({ message: "Utilisateur ne peut pas changer le mot de passe" });
      }
      bcrypt.hash(newPassword, 10)
        .then((hash) => {
          user.password = hash;
          user.code = null;
          user.codeVerifier = false;
          user.save()
            .then(() => {
              res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
            })
            .catch((error) => {
              console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
              res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
            });
        })
        .catch((error) => {
          console.error("Erreur lors du hachage du mot de passe : ", error);
          res.status(500).json({ message: "Erreur lors du traitement du mot de passe" });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

// DECONNEXION UTILISATEUR
const deconnexion = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  req.invalidatedTokens = req.invalidatedTokens || [];
  req.invalidatedTokens.push(token);
  res.status(200).json({ message: "Deconnexion réussi" });
};

module.exports = { inscription, connexion, deconnexion, utilisateur_actif, verification, verificationCode, resetpass };
