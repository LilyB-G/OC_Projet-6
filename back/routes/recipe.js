//Importation du router d'Express
const express = require('express');
const router = express.Router();

//Importation des Middleware 'auth' et 'multer'
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

//Importation des controllers
const recipeCtrl = require('../controllers/recipe');


//Select All définition des Routers
router.get('/', auth, recipeCtrl.getAllRecipe);
//Create
router.post('/', auth , multer , recipeCtrl.createRecipe);
//Select One
router.get('/:id', auth , recipeCtrl.selectRecipe);
//Update
router.put('/:id', auth , multer, recipeCtrl.updateRecipe);
//Delete
router.delete('/:id', auth , recipeCtrl.deleteRecipe);

router.post('/:id/like' , auth, recipeCtrl.functionlike);

//Exportation des Routers
module.exports = router;