const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

// Route to get a single recipe by ID
router.get('/:id', recipeController.getRecipeById);
// Route to get all recipes
router.get('/', recipeController.getAllRecipes);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.editRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;