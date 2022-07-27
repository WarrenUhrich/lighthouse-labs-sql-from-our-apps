require('dotenv').config();
const { Client } = require('pg');

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

const client = new Client({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
});

client.connect();

module.exports = { client };
