
const fs = require ('fs');
const Recipe = require ('../models/recipe');

exports.createRecipe = (req, res, next) => {

    const recipeObject = JSON.parse(req.body.recipe);
    delete recipeObject._id;
    delete recipeObject.userId;
    const recipe = new Recipe({
        ...recipeObject, userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/$(req.file.filename}`

    });

    recipe.save()
        .then(() => res.status(201).json({
            message: 'Recipe saved successfully'
        }))
        .catch(error => res.status(400).json({ error: error }));
};

exports.selectRecipe = (req, res, next) => {
    Recipe.findOne({ _id: req.params.id })
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(404).json({ error }));
};

exports.updateRecipe = (req, res, next) => {
    const recipeObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/$(req.file.filename}` 
    } : { ...req.body 
    };

    delete recipeObject.__userId;
    Recipe.findOne({_id: req.params.id})
    .then ((recipe)=> {
        if (recipe.userId != req.auth.userId){
            res.status(401).json({message: 'unautorized modification'});
        } else {
            Recipe.updateOne({_id:req.params.id}, { ...thingObject, _id: req.params.id})
            .then(()=> res.status(200).json({message: 'done'}))
            .catch(error => res.status(401).json({error}));
        }
    })
    .catch(error => res.status(400).json({error}));
};


exports.deleteRecipe = (req, res, next) => {
    Recipe.findOne({ _id: req.params.id })
        .then((recipe) => {
            if (recipe.userId != req.auth.userId){
                res.status(401).json({message: 'unautorized'});
            }else {
                const filename = recipe.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, ()=>{
                    recipe.deleteOne({_id:req.params.id})
                    .then(()=>{ res.status(200).json({message:'deleted'})
                    .catch(error => res.status(401).json({error}));
                    });
                });
            };
            
        })
        .catch(error => res.status(500).json({error}));
};



exports.getAllRecipe = (req, res, next) => {
    Recipe.find()
        .then((recipe) => res.status(200).json(recipe))
        .catch(error => res.status(400).json({ error: error }));

};