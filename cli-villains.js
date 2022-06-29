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

// client.query();
