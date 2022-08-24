require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { getVillains, getVillainById } = require('./data/villain-queries');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser());

app.listen(PORT, () => {
    console.log('Express app is now listening on port:', PORT);
});

app.get('/test', (req, res) => {
    res.end('Server is running!');
});

/**********************************************************************************
 * INDEX
 **********************************************************************************/

app.get('/movie-villains', (req, res) => {
    getVillains().then((villains) => {
        const templateVars = {villains};
        res.render('movie-villains/index', templateVars);
    });
});

/**********************************************************************************
 * SHOW
 **********************************************************************************/

 app.get('/movie-villains/:id', (req, res) => {
    getVillainById(req.params.id).then((villain) => {
        const templateVars = {villain};
        res.render('movie-villains/show', templateVars);
    });
});
