// const { Client } = require('pg');
const Client = require('pg').Client;

const config = {
    host: 'localhost',
    port: 5432,
    database: 'sql_from_our_apps',
    user: 'dbuser',
    password: 'dbuser'
};

const client = new Client(config);

// Establish a connection to the specified database
client.connect();
// client.end();

// console.log('Terminal arguments:', process.argv);

const verb = process.argv[2];

switch(verb) {
    case 'help':
        console.log(
            'cli-villains.js HELP\r\n' +
            '********************\r\n' +
            'help: offer list of commands\r\n' +
            'index: list all movie villains\r\n' +
            'show <ID>: display specific villain by ID\r\n' +
            'new <NAME> <MOVIE>: add new villain with specified name and movie\r\n' +
            'edit <ID> <NAME> <MOVIE>: update villain by ID\r\n' +
            'delete <ID>: remove villain by ID\r\n'
        );
        client.end();
        break;
    default:
        console.log('Invalid command; please run "cli-villains.js help" for assistance.');
        client.end();
        break;
}
