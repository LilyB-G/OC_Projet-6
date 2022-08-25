//Importation du package Mongoose
const mongoose = require('mongoose');

//Création du schéma
const recipeSchema = mongoose.Schema({
  //  _id: string,  automatique via mongodb
  userId :{type: String, required: true},
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true},
    heat: { type: Number, required: true},
    likes: { type: Number, required: true, default: 0},
    dislikes: { type: Number, required: true, default: 0},
    usersLiked : {type : [String], required : true, default: 0},
    usersDisliked : {type : [String], required : true, default: 0},
});

//Exportation du schéma recipe
module.exports = mongoose.model('Recipe', recipeSchema);