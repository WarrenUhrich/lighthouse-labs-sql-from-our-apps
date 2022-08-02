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
    .then((result) => {
        // console.log(result);
        console.log(result.rows);
        client.end(); // Frees up the command-line; avoid in Express apps.
    })
    .catch((error) => {
        console.error(error);
    });
