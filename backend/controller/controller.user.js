const User = require('../model/user');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

// UTILISATEUR CONNECTEE
const utilisateur_actif = (req, res) => {
    const userId = req.headers["authorization"].split(" ")[0];
        if(userId){
            User.findOne({ _id: userId })
                .then((user) => {
                    if(!user){
                        res.json({ message: "Utilisateur introuvable" })
                    }
                    res.json({ useractif: user })
                })
                .catch(error => res.status(400).json({ error }))
        }else{
            res.json({ message: "Token invalide"})
        }
    }

// INSCRIPTION UTILISATEUR
// data : email, password, role 
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
                return res.status(401).json({ message: 'Email ou mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Email ou mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'KEY_ANGULAR_24',
                            { expiresIn: '1200s' }
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