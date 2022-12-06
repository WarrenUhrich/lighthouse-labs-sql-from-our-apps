const express = require('express');
const morgan = require('morgan');
const { getAllVillains, getVillain } = require('./data/villain-queries');

const PORT = 8080;
const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log(`Express app listening on: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.end('Hello, World!');
});

/**
 * Villains index
 */
app.get('/villains', (req, res) => {
    getAllVillains()
        .then((rows) => {
            res.json(rows);
        });
});

/**
 * Villain show
 */
 app.get('/villains/:id', (req, res) => {
    const id = req.params.id;
    getVillain(id)
        .then((row) => {
            res.json(row);
        })
        .catch((error) => {
            res.status(404);
            res.json({error: 'Villain not found.'});
        });
});
