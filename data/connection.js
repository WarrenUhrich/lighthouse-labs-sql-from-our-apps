require('dotenv').config();
const { Client } = require('pg');

const { PGHOST, PGUSERNAME, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

// console.log({ PGHOST, PGUSERNAME, PGPASSWORD, PGDATABASE, PGPORT });

const client = new Client({
    user: PGUSERNAME,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT
});

client.connect();

module.exports = { client };
