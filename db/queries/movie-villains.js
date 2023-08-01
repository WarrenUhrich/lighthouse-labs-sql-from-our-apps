const client = require('../connection');

const getAllMovieVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
        .then((results) => {
            const rows = results.rows;
            console.log(rows);
            return rows;
        });
};

const getMovieVillainById = (id) => {
    return client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
        .then((results) => {
            const rows = results.rows;
            const record = rows[0];
            console.log(record);
            return record;
        });
};

module.exports = {
    getAllMovieVillains,
    getMovieVillainById
};
