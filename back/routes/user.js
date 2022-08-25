//assignation des Controllers
const userCtrl = require('../controllers/user');
//Importation du package router d'Express
const express = require('express');
const router = express.Router();

//new user Signup définition du chemin
router.post('/signup',  userCtrl.signup );

//Existant user login définition du chemin
router.post('/login',  userCtrl.login );

//Exportation du router
module.exports = router;