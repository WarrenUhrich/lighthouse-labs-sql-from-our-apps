require('dotenv').config();
const Client = require('pg').Client;

const config = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDB,
    user: process.env.PGUSERNAME,
    password: process.env.PGPASS
};

const client = new Client(config);

// Establish a connection to the specified database
client.connect();

module.exports = { client };
