const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const recipeCtrl = require('../controllers/recipe');


//Select All
router.get('/', auth, recipeCtrl.getAllRecipe);
//Create
router.post('/', auth , multer , recipeCtrl.createRecipe);
//Select One
router.get('/:id', auth , recipeCtrl.selectRecipe);
//Update
router.put('/:id', auth , multer, recipeCtrl.updateRecipe);
//Delete
router.delete('/:id', auth , recipeCtrl.deleteRecipe);






module.exports = router;