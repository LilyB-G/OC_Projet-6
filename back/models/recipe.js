const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  //  _id: string,  automatique via mongodb
  name: String,
  manufacturer: String,
  description: String,
  heat: Number,
  likes: Number,
  dislikes: Number,
  mainPepper: String,
  usersLiked: Array,
  usersDisliked: Array,
  userId: String,
  imageUrl: String
});


module.exports = mongoose.model('Recipe', recipeSchema);