require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    user: process.env.PGUSERNAME,
    host: process.env.PGHOST,
    database: process.env.PGDB,
    password: process.env.PGPASS,
    port: process.env.PGPORT,
});

client.connect();

module.exports = { client };
