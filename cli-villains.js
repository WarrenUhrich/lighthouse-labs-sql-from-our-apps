const pg = require('pg');

const Client = pg.Client;

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'dbuser',
    database: 'sql_from_apps',
    port: 5432
};

const client = new Client(config);

client.connect();

client.query('SELECT * FROM movie_villains;')
    .then((response) => {
        console.log('Response received!');
        // console.log(response); // Full Response object.
        console.log('Response Rows:', response.rows);
        client.end(); // Usually only used in terminal applications.
    })
    .catch((error) => { console.error(error); });
