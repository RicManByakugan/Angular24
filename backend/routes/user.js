const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentification")
const user_controller = require('../controller/controller.user');

// http://serveur..../utilisateur/
router.get('/utilisateur/actif', auth, user_controller.utilisateur_actif);
router.post('/utilisateur/inscription', user_controller.inscription);
router.post('/utilisateur/connexion', user_controller.connexion);
router.post('/utilisateur/deconnexion', user_controller.deconnexion);
router.post('/utilisateur/mdpoulbie', user_controller.verification);
router.post('/utilisateur/mdpoulbieVerification', user_controller.verificationCode);
router.post('/utilisateur/resend', user_controller.resend);
router.post('/utilisateur/resetpass', user_controller.resetpass);

module.exports = router;