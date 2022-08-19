const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  //  _id: string,  automatique via mongodb
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  heat: { type: Number, required: true, min: 1, max: 10 },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },

});


module.exports = mongoose.model('Recipe', recipeSchema);