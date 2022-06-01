require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const villainQueries = require('./database/villain-queries');
const {getVillains, getVillainById} = villainQueries;

const app = express();
const port = process.env.PORT || 3000;

// app.set('view engine', 'ejs');

// Middleware.
app.use(morgan('dev'));

// Routes.

app.get('/villains', (req, res) => {
    getVillains()
        .then((villains) => {
            res.json(villains);
            // res.render('villains/index', {villains});
        });
});

app.get('/villains/:id', (req, res) => {
    getVillainById(req.params.id)
        .then((villain) => {
            res.json(villain);
            // res.render('villains/show', {villain});
        });
});

// Listener.
app.listen(port, () => {
    console.log('CRUD app is listening on port:', port);
});
