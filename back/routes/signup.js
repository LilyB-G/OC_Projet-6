
//const auth = require('../middleware/auth');

//Assignation des controllers
const signupCtrl = require('../controllers/user');


//Importation du package router d'Express
const express = require('express');
const router = express.Router();

//Définition du chemin "signup"
//new user Signup
//console.log('router signup');
router.post('/api/auth/signup', signupCtrl.signup);

//Exportation du router
module.exports = router;