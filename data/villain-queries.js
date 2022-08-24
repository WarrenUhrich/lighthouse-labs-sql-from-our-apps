const { client } = require('./connection');

// INDEX:
const getVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
                 .then((result) => {return result.rows;});
};

// SHOW:
const getVillainById = (id) => {
    return client.query('SELECT * FROM movie_villains WHERE id=$1;', [id])
                 .then((result) => {return result.rows[0];});
};

module.exports = { getVillains, getVillainById };
