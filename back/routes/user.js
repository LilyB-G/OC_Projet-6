
const userCtrl = require('../controllers/user');
const express = require('express');
const router = express.Router();


//new user Signup
router.post('/signup',  userCtrl.signup );


//Existant user login
router.post('/login',  userCtrl.login );


module.exports = router;