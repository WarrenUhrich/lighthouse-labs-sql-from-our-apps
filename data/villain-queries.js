const { client } = require('./connection');

// INDEX:
const getVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
            .then((result) => {
                console.log(result.rows);
                return result.rows;
            })
            .catch((error) => {
                console.error(error);
            });
};

// SHOW:
const getVillainById = (id) => {
    return client.query('SELECT * FROM movie_villains WHERE id=$1;', [id])
            .then((result) => {
                console.log(result.rows[0]);
                return result.rows[0];
            })
            .catch((error) => {
                console.error(error);
            });
};

module.exports = { getVillains, getVillainById };
