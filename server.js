const express = require('express');
const app = express();
const connectDB = require('./db'); // Adjust path to the db.js file
require('dotenv').config(); // Load environment variables
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Confirm that the /recipes routes are being used
console.log('Using /recipes routes...');
app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || port);
console.log('Web Server is listening at port ' + (process.env.port || port));

