const client = require('../connection');

// Function to retrieve all villains.
const getAllMovieVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
                 .then((result) => {
                    return result.rows; // Just the array of villains.
                 });
};

// Function to retrieve ONE movie villain by ID.
const getMovieVillainById = (id) => {
    return client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
                 .then((result) => {
                    return result.rows[0]; // Just the first villain in the array of villains.
                 });
};

module.exports = {
    getAllMovieVillains,
    getMovieVillainById
};
