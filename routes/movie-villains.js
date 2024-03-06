const express = require('express');
const router = express.Router();
const { getAllMovieVillains, getMovieVillainById } = require('../db/queries/movie-villains');

/**
 * ALL ROUTES IN THIS FILE START WITH: /movie-villains
 */

// GET /movie-villains/
// index! show all movie villains
router.get('/', (req, res) => {
    getAllMovieVillains()
        .then((movieVillains) => {
            const templateVars = {
                movieVillains
            };
            res.status(200).render('movie-villains/index', templateVars);
        });
});

// GET /movie-villains/:id
// show! show single movie villain based on ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    getMovieVillainById(id)
        .then((movieVillain) => {
            const templateVars = {
                movieVillain
            };
            res.status(200).render('movie-villains/show', templateVars);
        });
});

module.exports = router;
