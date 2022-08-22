
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
/*const Salt = 10;
const String = "aeaeaasfsfefzez";

 async function crypt(String , Salt) {

    bcrypt.hash(String, Salt)
        .then(value => console.log(value));
    
  }
crypt('aafeaaaaaa',1);
 */

exports.signup = (req, res, next) => {
console.log('signup');

     bcrypt.hash(req.body.password, 10)
        .then(hash => {
            
            const user = new User({
                email: req.body.email,
                password: hash

            });

            user.save()
                .then(() => {
                    
                    res.status(201).json({ message: 'new user saved' })
                })
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status (500).json({ error }));

};



exports.login = async (req, res, next) => {
console.log('login');
     await User.findOne({ email: req.body.email })
        .then(user => {

            if (!user) {
                return res.status(401).json({ message: 'login not found' });

            }
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

