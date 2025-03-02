const routes = require('express').Router();
const passport = require('passport');
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

//dashboard
routes.get('/dashboard', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    console.log("made it here")
    console.log(req.user)
    res.render('dashboard', { user: req.user })
});

module.exports = routes;