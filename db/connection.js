const pg = require('pg');
const Client = pg.Client;
require('dotenv').config();
// console.log('process.env', process.env);
// console.log('process.env.DB_HOST', process.env.DB_HOST);

const config = {
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    database: process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS
};

const client = new Client(config);
client.connect();

module.exports = client;
