const {client} = require('./connection');

const getVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
        .then((response) => {
            console.log(response.rows);
            return response.rows;
        });
};

const getVillainByID = (villainID) => {
    return client.query('SELECT * FROM movie_villains WHERE id = $1;', [villainID])
        .then((response) => {
            console.log(response.rows[0]);
            return response.rows[0];
        });
};

module.exports = {
    getVillains,
    getVillainByID
};
