const mongoose = require('mongoose');
const Recipe = require('./models/Recipes');
const recipes = require('./recipes.json'); // Adjust path as necessary

require('dotenv').config();

const loadData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert contacts into the collection
    await Recipe.insertMany(recipes);

    console.log('Recipes successfully imported!');
    process.exit();
  } catch (error) {
    console.error('Error loading recipes:', error.message);
    process.exit(1);
  }
};

loadData();