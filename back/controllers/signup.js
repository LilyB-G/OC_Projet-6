
const bcrypt = require('bcrypt');
let User = require('../models/user');


exports.signup = (req, res, next) => {
    console.log ('route signup');
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            
            
            user.save()
                .then(() => res.status(201).json({ message: 'new user saved' }))
                .catch(error => res.status(400).json({ error }));
        });

};




