const { client } = require('./connection');

// INDEX:
const getVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
                 .then((result) => {return result.rows;});
};

module.exports = { getVillains };
