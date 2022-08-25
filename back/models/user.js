//Importation du package Mongoose
const mongoose = require('mongoose');
//Importation du package Mongoose-unique-validator 
const uniqueValidator = require('mongoose-unique-validator');

//Création du schéma
const userSchema = mongoose.Schema({
    
    email: { type: String, required : true , unique : true},
    password : { type : String, required : true }
       
});

//Pas de doublon avec la même adresse e-mail
userSchema.plugin(uniqueValidator);

//Exportation du schéma user
module.exports = mongoose.model('User', userSchema);