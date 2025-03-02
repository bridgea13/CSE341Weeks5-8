const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express();
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const connectDB = require('./db'); 
require('dotenv').config(); // Load environment variables

// Passport Config
require('./config/passport')(passport);

// Connect Database
connectDB();


app.set('views', path.join(__dirname, 'views'))

// Handlebars Setup
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Morgan (Logging for Development)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Swagger API Docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
console.log('Using /recipes routes...');
app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));

// Simple Login Page Route
app.get('/login', (req, res) => {
    res.send('Login Page');
});

// Port Setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Web Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});
