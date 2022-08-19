const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const signupSchema = mongoose.Schema({
    
    email: { type: String, required : true , unique : true},
    password : { type : String, required : true },
        
});

//signupSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Signup', signupSchema);