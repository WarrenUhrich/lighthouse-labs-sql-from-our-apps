const {  Client } = require('pg');

const config = {
    user: 'myuser',
    password: 'myuser',
    host: 'localhost',
    database: 'sql_from_our_apps',
    port: 5432,
};

const client = new Client(config);

client.connect();

client.query('SELECT * FROM movie_villains;')
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
