const User = require('../model/user');
const { ObjectID } = require("bson")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

// UTILISATEUR CONNECTEE
const utilisateur_actif = (req, res) => {
    if (req.auth.userId) {
        User.findOne({ _id: new ObjectID(req.auth.userId) })
            .then((user) => {
                if (!user) {
                    res.json({ message: "Utilisateur introuvable" })
                }
                res.json({ useractif: user })
            })
            .catch(error => res.status(400).json({ error }))
    } else {
        res.json({ message: "Token invalide" })
    }
}

// INSCRIPTION UTILISATEUR
// data : email, password, role, nom, prenom, subject
const inscription = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(201).json({ message: 'Email déjà utilisé' })
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = new User({
                            email: req.body.email,
                            role: req.body.role,
                            nom: req.body.nom,
                            prenom: req.body.prenom,
                            subject: req.body.subject,
                            password: hash
                        });
                        user.save()
                            .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }))
};

// CONNEXION UTILISATEUR
const connexion = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(200).json({ message: 'Email ou mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(200).json({ message: 'Email ou mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        message: "Utilisateur connecté",
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'KEY_ANGULAR_24',
                            { expiresIn: '3600s' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// DECONNEXION UTILISATEUR
const deconnexion = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    req.invalidatedTokens = req.invalidatedTokens || [];
    req.invalidatedTokens.push(token);
    res.status(200).json({ message: 'Deconnexion réussi' });
};

module.exports = { inscription, connexion, deconnexion, utilisateur_actif };