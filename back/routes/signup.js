
const auth = require('../middleware/auth');
const signupCtrl = require('../controllers/signup');
const loginCtrl = require('../controllers/login');


const express = require('express');
const router = express.Router();

//new user Signup
router.post('/api/auth/signup', signupCtrl.signup);

//Existant user login
router.post('/api/auth/login', loginCtrl.login);

module.exports = router;