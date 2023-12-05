const client = require('../connection');

const getAllMovieVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
                 .then((results) => {
                   return results.rows;
                 });
}

const getMovieVillain = (id) => {
    return client.query('SELECT * FROM movie_villains WHERE id=$1;', [id])
                 .then((results) => {
                   return results.rows[0];
                 });
}

module.exports = {
    getAllMovieVillains,
    getMovieVillain
};
