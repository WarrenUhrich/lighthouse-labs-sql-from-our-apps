const express = require('express');
const router = express.Router();
const {
    getAllMovieVillains,
    getMovieVillainById
} = require('../db/queries/movie-villains');

/**
 * Index
 */

router.get('/', (req, res) => {
    getAllMovieVillains()
        .then((movieVillains) => {
            const templateVars = {
                movieVillains: movieVillains
            };
            res.render('movie-villains/index', templateVars);
        });
});

/**
 * Show Movie Villain
 */

router.get('/:id', (req, res) => {
    getMovieVillainById(req.params.id)
        .then((movieVillain) => {
            const templateVars = {
                movieVillain: movieVillain
            };
            res.render('movie-villains/show', templateVars);
        });
});

module.exports = router;
