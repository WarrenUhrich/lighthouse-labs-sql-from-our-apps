require('dotenv').config();

const pg = require('pg');
const Client = pg.Client;

const dbConfig = {
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    port: process.env.DBPORT
};

const client = new Client(dbConfig);

client.connect();

module.exports = {client};
