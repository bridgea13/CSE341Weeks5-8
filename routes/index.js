const routes = require('express').Router();
const recipeRoutes = require('./recipes');


routes.use('/', require('./swagger'));
routes.use('/recipes', recipeRoutes);

module.exports = routes;