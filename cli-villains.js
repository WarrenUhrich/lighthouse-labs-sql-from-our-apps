const pg = require('pg');
const Client = pg.Client;

const dbConfig = {
    user: 'dbuser',
    password: 'dbuser',
    host: 'localhost',
    database: 'postgres',
    port: 5432
};

const client = new Client(dbConfig);

client.connect();

client.query('SELECT * FROM movie_villains;')
    .then((response) => {
        console.log(response.rows);
        client.end();
    });
