const { client } = require('./connection');

// INDEX:
const getVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
        .then((res) => {
            console.log('getVillains:', res.rows);
            return res.rows;
        });
};

// SHOW:
const getVillainById = (id) => {
    return client.query('SELECT * FROM movie_villains WHERE id=$1;', [id])
        .then((res) => {
            console.log('getVillainById:', res.rows[0]);
            return res.rows[0];
        });
};


module.exports = {
    getVillains,
    getVillainById
};
