const express = require('express');
const morgan = require('morgan');
const client = require('./db/connection');
const {
    getAllMovieVillains,
    getMovieVillainById
} = require('./db/queries/movie-villains');

/////////////////////////////////////////////////////////////////////////////////
// Set-up
/////////////////////////////////////////////////////////////////////////////////

const app = express();
const PORT = 5050;

app.set('view engine', 'ejs');

/////////////////////////////////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////////////////////////////////

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

/////////////////////////////////////////////////////////////////////////////////
// Listener
/////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => console.log(
    'Express app now listening on port:', PORT
));

/////////////////////////////////////////////////////////////////////////////////
// Routes
/////////////////////////////////////////////////////////////////////////////////

app.get('/test', (req, res) => {
    res.status(200).end('<p>Hello, World!</p>');
});

/**
 * Index
 */

app.get('/movie-villains/', (req, res) => {
    getAllMovieVillains()
        .then((movieVillains) => {
            const templateVars = {
                movieVillains: movieVillains
            };
            res.render('movie-villains/index', templateVars);
        });

    // client.query('SELECT * FROM movie_villains;')
    //     .then((result) => {
    //         const movieVillains = result.rows;

    //         console.log('movieVillains:', movieVillains);

    //         const templateVars = {
    //             movieVillains: movieVillains
    //         };
            
    //         res.render('movie-villains/index', templateVars);
    //     });
});

/**
 * Show Movie Villain
 */

app.get('/movie-villains/:id', (req, res) => {
    getMovieVillainById(req.params.id)
        .then((movieVillain) => {
            const templateVars = {
                movieVillain: movieVillain
            };
            res.render('movie-villains/show', templateVars);
        });
});
