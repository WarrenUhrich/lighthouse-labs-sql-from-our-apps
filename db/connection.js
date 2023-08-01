const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const Client = pg.Client;

const config = {
    host: 'localhost',
    port: 5432,
    database: 'sql_from_our_apps',
    user: 'dbuser',
    password: 'dbuser',
};

const client = new Client(config);
client.connect();

module.exports = client;
