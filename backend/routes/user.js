const express = require('express');
const router = express.Router();

const user_controller = require('../controller/controller.user');

// http://serveur..../user/
router.post('utilisateur/inscription', user_controller.inscription);
router.post('utilisateur/connexion', user_controller.connexion);
router.post('utilisateur/deconnexion', user_controller.deconnexion);

module.exports = router;