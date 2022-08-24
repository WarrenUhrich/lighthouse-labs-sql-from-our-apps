require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser());

app.listen(PORT, () => {
    console.log('Express app is now listening on port:', PORT);
});
