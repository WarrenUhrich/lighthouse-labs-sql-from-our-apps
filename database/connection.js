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

module.exports = {client};
