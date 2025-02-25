const express = require('express');
const app = express();
const morgan = require('morgan');
//const dotenv = require('dotenv')
const { engine } = require('express-handlebars');
const connectDB = require('./db'); // Adjust path to the db.js file
require('dotenv').config(); // Load environment variables

//handlebars
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', '.hbs');

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(
    port,
    console.log(`Web Server is running in ${process.env.NODE_ENV} mode on port ${port}`)
);

