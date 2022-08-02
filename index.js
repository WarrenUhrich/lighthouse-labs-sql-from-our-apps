require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log('Express application is running on port:', PORT);
});
