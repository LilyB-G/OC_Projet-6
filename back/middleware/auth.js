//Importation du package JsonWebToken
const jwt = require('jsonwebtoken');

//Exportation des middlewares
module.exports = (req, res, next) => {
    try {
        //Récupération du token après bearer
        const token = req.headers.authorization.split(' ')[1];
        //Décode le token et vérifie
        const decodedToken = jwt.verify(token, 'P6-Secret-Key');
        const userId = decodedToken.userId;
        //compare les userId
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User Id not usable';
        } else {

            next();
        }
    } catch (error) {
        res.status(401).json({ error });
    }
};