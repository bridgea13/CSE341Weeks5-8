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
// routes.get('/dashboard', (req, res) => {
//     if (!req.user) {
//         return res.redirect('/login');
//     }
//     console.log("made it here")
//     console.log(req.user)
//     res.render('dashboard', { user: req.user })
// });

module.exports = router;