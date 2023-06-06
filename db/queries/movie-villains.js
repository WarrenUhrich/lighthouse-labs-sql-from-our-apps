const client = require('../connection');

const getAllMovieVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
        .then((result) => {
            return result.rows;
        });
};

const getMovieVillainById = (id) => {
    return client.query(
        `SELECT *
        FROM movie_villains
        WHERE id=$1;`,
        [id]
    )
        .then((result) => {
            return result.rows[0]; // Return only the ONE result
        });
};

module.exports = {
    getAllMovieVillains,
    getMovieVillainById
};
