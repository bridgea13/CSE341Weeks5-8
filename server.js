const path = require ('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express();
const morgan = require('morgan');
//const dotenv = require('dotenv')
const { engine } = require('express-handlebars');
const connectDB = require('./db'); // Adjust path to the db.js file
require('dotenv').config(); // Load environment variables

//passport config
require('./config/passport')(passport)

//handlebars
app.engine('.hbs', engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//static folder
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

//dotenv.config({ path: './config/config.env'})
if (process.env.NODE_ENV === 'development')  {
    app.use(morgan('dev'))
}

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Confirm that the /recipes routes are being used
console.log('Using /recipes routes...');
app.use('/', require('./routes'));
app.use('/login', (req, res) => {
    res.send('Login Page');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', require('./routes/auth'))

app.listen(
    port,
    console.log(`Web Server is running in ${process.env.NODE_ENV} mode on port ${port}`)
);

