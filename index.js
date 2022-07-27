require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Install nodemon...
// Install ejs...

const { getVillains, getVillainById } = require('./data/villain-queries');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log('Express villains app is listening on port:', PORT);
});

app.get('/test', (req, res) => {
    res.end('Server is running; hello!');
});

app.get('/villains', (req, res) => {
    getVillains().then((villains) => {
        const templateVars = {villains};
        res.render('index', templateVars);
    });
});

app.get('/villains/:id', (req, res) => {
    const villainId = req.params.id;
    getVillainById(villainId).then((villain) => {
        const templateVars = {villain};
        res.render('show', templateVars);
    });
});
