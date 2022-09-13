//Importation de recipe.js à partir de models
const Recipe = require('../models/recipe');
//Importation du package fs de Node, module qui fournit des fonctions utiles pour intéragir avec le système des fichiers
const fs = require('fs');

//Exportation des fonctions create, update, delete, getOne, getAll
exports.createRecipe = (req, res, next) => {
    //modification du format de la requête pour la transformer en objet 
    const recipeObject = JSON.parse(req.body.sauce);
    console.log(req.body);
    delete recipeObject._id;
    //delete thingObject._userId;

    //Création d'une nouvelle recette
    const recipe = new Recipe({
        //Récupération des informations
        ...recipeObject,
        //userId: req.auth.userId,
        //Récupération de l'URL dynamique "image" généré par multer
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    //Enregistre l'objet dans la BDD
    recipe.save()
        .then(() => { res.status(201).json({ message: 'Your recipe is added !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.updateRecipe = (req, res, next) => {
    Recipe.findOne({ _id: req.params.id })
    .then((recipe) => {
        let recipeObject = { ...req.body };
        if (req.file) {
          const filename = recipe.imageUrl.split('/images/')[1];
          recipeObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Deleted file from ./images: ${filename}`);
            }
          });
        }
        Recipe.updateOne({ _id: req.params.id }, { ...recipeObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Your recipe is modified' }))
        .catch(error => res.status(400).json({ error }));
      })
  };

exports.deleteRecipe = (req, res, next) => {
    Recipe.findOne({ _id: req.params.id }, )
        .then(recipe => {
            //Récupération du fichier
            const filename = recipe.imageUrl.split('/images/')[1];
            //Suppression du ficgier grâce à unlink
            fs.unlink(`images/${filename}`, () => {
                Recipe.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Your recipe is deleted !' }) })
                    .catch(error => res.status(401).json({ error }));
            });
        })
        .catch(error => res.status(400).json({ error })
        )
};

exports.getAllRecipe = (req, res, next) => {
    
    Recipe.find()
        .then((recipe) => 
        
        res.status(200).json(recipe))
        .catch(error => res.status(400).json({ error: error }));

};

//récupération d'une seule recette
exports.selectRecipe = (req, res, next) => {
    
    Recipe.findOne({ _id: req.params.id }) //définit le même id que la recette demandée
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(404).json({ error }));
};

//Création des likes
exports.functionlike = (req, res) => {

    if (req.body.like === 1) {
        Recipe.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
        )
            .then(() => res.status(200).json({ message: "You like this recipe" }))
            .catch((error) => res.status(400).json({ error }));
    }
    else if (req.body.like === -1) {
        Recipe.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
        )
            .then(() => res.status(200).json({ message: "You don't like this recipe" }))
            .catch((error) => res.status(400).json({ error }));
    } else {
        Recipe.findOne({ _id: req.params.id }).then((result) => {
            if (result.usersLiked.includes(req.body.userId)) {
                Recipe.findOneAndUpdate(
                    { _id: req.params.id },
                    { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
                )
                    .then(() => res.status(200).json({ message: "Your like deletion is stored" }))
                    .catch((error) => res.status(400).json({ error }));
            }
            else if (result.usersDisliked.includes(req.body.userId)) {
                Recipe.findOneAndUpdate(
                    { _id: req.params.id },
                    { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
                )
                    .then(() => res.status(200).json({ message: "Your dislike deletion is stored" }))
                    .catch((error) => res.status(400).json({ error }))
            }
        })
    }

}




/*Recipe.save()
    .then(() => { res.status(201).json({ message: 'like stored' }) })
    .catch(error => { res.status(400).json({ error }) })*/


/*if (req.body.like == 0){
    if (sauce.usersLiked.indexof(req.body.userId) != -1){
        recipe.like++;
        recipe.usersLiked.splice(recipe.usersLiked.indexOf(req.body.userId), 1);
    }else{
        recipe.dislikes++;
        recipe.usersDislked.splice(recipe.usersDisliked.indexOf(req.body.userId), 1);
    }
    recipe.save();
}*/

