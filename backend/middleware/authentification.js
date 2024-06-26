const jwt = require('jsonwebtoken');

// VERIFICATION AVEC TOKEN SI UTILISATEUR CONNECTER OU PAS
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'KEY_ANGULAR_24');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(200).json({ message: "Invalid token" });
    }
};
