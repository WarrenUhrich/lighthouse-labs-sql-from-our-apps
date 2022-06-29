require('dotenv').config();
const pg = require('pg');

const Client = pg.Client;

const {PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT} = process.env;

const config = {
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: PGPORT
};

const client = new Client(config);

client.connect();

module.exports = {client};
