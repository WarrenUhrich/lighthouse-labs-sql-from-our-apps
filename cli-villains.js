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
let id, name, movie;

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
    case 'index':
        client.query('SELECT * FROM movie_villains;')
              .then((result) => {
                return result.rows;
              })
              .then((rows) => {
                console.log(rows);
                client.end();
              });
        break;
    case 'show':
        id = process.argv[3];
        // Never pass user values into a query directly!
        // You're leaving yourself open to SQL injection attacks this way...
        // client.query(`SELECT * FROM movie_villains WHERE id = ${id};`)
        // Instead, sanitize your values first!!!
        client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
              .then(result => result.rows)
              .then(rows => rows[0])
              .then((row) => {
                console.log(row);
                client.end();
              });
        break;
    case 'new':
        name = process.argv[3];
        movie = process.argv[4];
        client.query(
            'INSERT INTO movie_villains(villain, movie) ' +
            'VALUES($1, $2);',
            [name, movie]
        ).then((result) => {
            console.log('A new villain was born!');
            client.end();
        });
        break;
    case 'edit':
        id = process.argv[3];
        name = process.argv[4];
        movie = process.argv[5];
        client.query(
            'UPDATE movie_villains SET villain = $2, movie = $3 WHERE id = $1;',
            [id, name, movie]
        ).then((result) => {
            console.log('Villain has changed their style.');
            client.end();
        });
        break;
    case 'delete':
        id = process.argv[3];
        client.query('DELETE FROM movie_villains WHERE id = $1;', [id])
              .then((result) => {
                console.log('Villain defeated!');
                client.end();
              });
        break;
    default:
        console.log('Invalid command; please run "cli-villains.js help" for assistance.');
        client.end();
        break;
}
