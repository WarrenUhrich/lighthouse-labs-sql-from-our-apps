const client = require('./connection').client;

/**
 * Villains index
 */
const getAllVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
                 .then(result => result.rows);
};

/**
 * Villains show
 */
 const getVillain = (id) => {
    return client.query('SELECT * FROM movie_villains WHERE ID = $1;', [id])
                 .then(result => result.rows)
                 .then(rows => rows[0]);
};

module.exports = { getAllVillains, getVillain };
