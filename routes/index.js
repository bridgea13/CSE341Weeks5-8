const routes = require('express').Router();
const recipeRoutes = require('./recipes');


routes.use('/', require('./swagger'));
routes.use('/recipes', recipeRoutes);
routes.get('/', (req, res) => {
 res.render('login', {
    layout: 'login', 
 })  
});
routes.get('/login', (req, res) => {
    res.render('login', {
        layout: 'login',
    })
});

module.exports = routes;