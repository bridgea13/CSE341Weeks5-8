const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipeName: { type: String, required: true },
    genre: { type: String },
    mealType: { type: String },
    servings: { type: String, required: true },    
    ingredients: { type: String, required: true },
    directions: { type: String, required: true },
    recipeOwner: { type: String },
});

module.exports = mongoose.model('Recipe', RecipeSchema);