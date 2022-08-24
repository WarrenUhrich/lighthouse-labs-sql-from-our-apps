const { Client } = require('pg');

const client = new Client({
    user: 'myuser',
    host: 'localhost',
    database: 'sql_from_our_apps',
    password: 'myuser',
    port: 5432,
});

client.connect();

client.query('SELECT * FROM movie_villains;')
      .then((response) => {
        // console.log(response);
        console.log(response.rows);
        client.end();
      });
