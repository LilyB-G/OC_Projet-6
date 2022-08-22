//const auth = require('../middleware/auth');
//Assignation des controllers
const loginCtrl = require('../controllers/user');

//Importation du package router d'Express
const express = require('express');
const router = express.Router();

//Définition du chemin "login"
//Existant user login
//console.log('router login');
router.post('/api/auth/login', loginCtrl.login);

//Exportation du router
module.exports = router;