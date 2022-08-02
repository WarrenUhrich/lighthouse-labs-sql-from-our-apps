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

module.exports = { getVillains };
