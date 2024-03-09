const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentification")
const user_controller = require('../controller/controller.user');

// http://serveur..../utilisateur/
router.get('/utilisateur/actif', auth, user_controller.utilisateur_actif);
router.post('/utilisateur/inscription', user_controller.inscription);
router.post('/utilisateur/connexion', user_controller.connexion);
router.post('/utilisateur/deconnexion', user_controller.deconnexion);

module.exports = router;