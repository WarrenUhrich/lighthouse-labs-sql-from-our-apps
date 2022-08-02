require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { getVillains } = require('./data/villain-queries');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log('Express application is running on port:', PORT);
});

app.get('/movie-villains', (req, res) => {
    getVillains().then((rows) => {
        const templateVars = {villains: rows};
        res.render('movie-villains/index', templateVars);
    });
});
