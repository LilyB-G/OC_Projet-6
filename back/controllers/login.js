
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = (req, res, next) => {
    console.log ("route login");
    User.findOne({ email: req.body.email })
        .then(roll => {
            if (!roll) {
                
                return res.status(401).json({ message: 'login not found' });
                
            }
            bcrypt.compare(req.body.password, User.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'incorrect password' });
                    }
                    res.status(200).json({
                        userId: User._id,
                        token: jwt.sign(
                            { userId: this.login._id }, 'RANDOM_TOKEN_SECRET', { expireIn: '24h' }
                        )

                    });
                   
                })
                .catch(error => res.status(500).json({ error }));
                
        })
        .catch(error => res.status(500).json({ error }));
        

};

