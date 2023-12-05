const express = require('express');
const router = express.Router();
const { getAllMovieVillains, getMovieVillain } = require('../db/queries/movie-villains');

// EVERY ROUTE IN THIS FILE BEGINS WITH:
// /movie-villains

/**
 * INDEX
 * Browse all movie villains.
 * 
 * http://localhost:8080/movie-villains/
 */
router.get('/', (req, res) => {
    getAllMovieVillains()
        .then((movieVillains) => {
            const templateVars = { movieVillains: movieVillains };
            res.render('movie-villains/index', templateVars);
        });
});

/**
 * SHOW
 * Show a specific movie villain.
 * 
 * http://localhost:8080/movie-villains/:id
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;

    getMovieVillain(id)
        .then((movieVillain) => {
            const templateVars = { movieVillain: movieVillain };
            res.render('movie-villains/show', templateVars);
        });
});

module.exports = router;
