const express = require('express');
const router = express.Router();
const { getAllMovieVillains, getMovieVillainById } = require('../db/queries/movie-villains');

/**
 * INDEX
 * Browse all movie villains.
 */
router.get('/', (req, res) => {
    getAllMovieVillains().then((movieVillains) => {
        const templateVar = { movieVillains };
        res.render('movie-villains/index', templateVar);
    });
});

/**
 * SHOW
 * Display specific movie villain.
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    getMovieVillainById(id).then((movieVillain) => {
        const templateVar = { movieVillain };
        res.render('movie-villains/show', templateVar);
    });
});

module.exports = router;
