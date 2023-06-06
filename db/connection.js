require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;

const config = {
    host:     process.env.DATABASE_HOST,
    port:     process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user:     process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
};

const client = new Client(config);

client.connect();

module.exports = client;
