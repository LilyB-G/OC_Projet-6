//Importation du package bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt');
//Importation du package jwt pour générer les tokens
const jwt = require('jsonwebtoken');
//Importation de user.js du dossier mdoels
const User = require('../models/user');
/*const Salt = 10;
const String = "aeaeaasfsfefzez";

 async function crypt(String , Salt) {

    bcrypt.hash(String, Salt)
        .then(value => console.log(value));
    
  }
crypt('aafeaaaaaa',1);
 */

//exportation des fonctions "signup" ...
exports.signup = (req, res, next) => {
    console.log('signup');
    //hash le mot de passe 10 fois
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //récupère l'e-mail et nouveau mot de passe
            const user = new User({
                email: req.body.email,
                password: hash
            });
            //sauvegarde les données
            user.save()
                .then(() => {
                    res.status(201).json({ message: 'new user saved' })
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//... et login
exports.login = async (req, res, next) => {
    console.log('login');
    //méthode findOne pour trouver un seul utilisateur et récupère l'adresse e-mail
    await User.findOne({ email: req.body.email })
        .then(user => {

            if (!user) {
                return res.status(401).json({ message: 'login not found' });
            }
            //Compare le mot de passe entré et celui de la BDD
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {

                    if (!valid) {
                        return res.status(401).json({ message: 'incorrect password' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'P6-Secret-Key',
                            { expiresIn: '24h' })
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

