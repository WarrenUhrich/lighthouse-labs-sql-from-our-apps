require('dotenv').config();
const { Client } = require('pg');

const { PGHOST, DBUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

const config = {
    user: DBUSER,
    password: PGPASSWORD,
    host: PGHOST,
    database: PGDATABASE,
    port: PGPORT,
};

const client = new Client(config);

client.connect();

module.exports = { client };
