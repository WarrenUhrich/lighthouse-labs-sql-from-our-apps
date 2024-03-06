require('dotenv').config(); // This will place your .env KEY/VALUE pairs into process

const pg = require('pg');
const Client = pg.Client;

const config = {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:     process.env.DB_PORT
};

const client = new Client(config);
client.connect(); // Will throw an error if it can't connect.

module.exports = client;
