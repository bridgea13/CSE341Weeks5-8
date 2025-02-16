const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipeName: { type: String, required: true },
    genre: { type: String },
    mealType: { type: String },
    servings: { type: Number, required: true, max: 3, min: 1 },    
    ingredients: { type: String, required: true },
    directions: { type: String, required: true },
    recipeOwner: { type: String, maxlength: 30 },
});

module.exports = mongoose.model('Recipe', RecipeSchema);