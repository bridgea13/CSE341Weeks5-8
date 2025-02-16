const Recipe = require('../models/Recipes');
const express = require('express');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find(); 
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recipes', error });
    }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const recipe = await Recipe.findById(id);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      res.json(recipe);
    } catch (error) {
      console.error(error.message);
  
      // Handle invalid ObjectId format
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid recipe ID' });
      }
  
      res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
  
    try {
      const recipe = await Recipe.findByIdAndDelete(id);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      res.status(200).json({ message: 'Recipe deleted successfully', recipe });
    } catch (error) {
      console.error(error.message);
  
      // Handle invalid ObjectId format
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid recipe ID' });
      }
  
      res.status(500).json({ message: 'Server error' });
    }
};

exports.createRecipe = async (req, res) => {
    console.log(req.body);
    
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing.' });
    }
    const { recipeName, genre, mealType, servings, ingredients, directions, recipeOwner} = req.body; 
  
    try 
    {
      if (!recipeName || !servings || !ingredients || !directions) {
        return res.status(400).json({ message: 'Recipe name, servings, ingredients, and directions are required.' });
      }
  
      const newRecipe = new Recipe({ recipeName, genre, mealType, servings, ingredients, directions, recipeOwner });
      const savedRecipe = await newRecipe.save();
  
      res.status(201).json({ message: 'Recipe created successfully', id: savedRecipe._id });
    } catch (error) {
      console.error('Error creating Recipe:', error);
      res.status(500).json({ message: 'Error creating Recipe', error });
    }
};

exports.editRecipe = async (req, res) => {
    const { id } = req.params; 
    let { recipeName, genre, mealType, servings, ingredients, directions, recipeOwner } = req.body; 
  
    try {
      const oldRecipe = await Recipe.findById(id);
  
      if (recipeName != null) {
        recipeName = recipeName;
      } else {
        recipeName = oldRecipe.recipeName;
      }
      
      if (genre != null) {
        genre = genre;
      } else {
        genre = oldRecipe.genre;
  
      }if (mealType != null) {
        mealType = mealType;
      } else {
        mealType = oldRecipe.mealType;
  
      }if (servings != null) {
        servings = servings;
      } else {
        servings = oldRecipe.servings;
  
      }if (ingredients != null) {
        ingredients = ingredients;
      } else {
        ingredients = oldRecipe.ingredients;
      
      }if (directions != null) {
        directions = directions;
      } else {
        directions = oldRecipe.directions;
      
      }if (recipeOwner != null) {
        recipeOwner = recipeOwner;
      } else {
        recipeOwner = oldRecipe.recipeOwner;
      }
  
      const editRecipe = new Recipe({ recipeName, genre, mealType, servings, ingredients, directions, recipeOwner });
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        id, 
        { recipeName, genre, mealType, servings, ingredients, directions, recipeOwner }, 
        { new: true, runValidators: true }
      );
          if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recipe not found.' });
      }
  
      res.status(204).json();
    } catch (error) {
      console.error('Error updating recipe:', error);
  
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid recipe ID.' });
      }
  
      res.status(500).json({ message: 'Server error.' });
    }
};