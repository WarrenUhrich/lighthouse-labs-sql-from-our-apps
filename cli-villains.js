// const Client = require('pg').Client;
const { Client } = require('pg');

const client = new Client({
    user: 'myuser',
    host: 'localhost',
    database: 'sql_from_our_apps',
    password: 'myuser',
    port: 5432,
});

client.connect();

const verb = process.argv[2];
// console.log(verb);

switch (verb) {
    case 'help':
        console.log(
            'Help for Movie Villain CRUD program:\n',
            '\tnode cli-villains.js index\n',
            '\tnode cli-villains.js show <id>\n',
            '\tnode cli-villains.js edit <id> <name> <movie>\n',
            '\tnode cli-villains.js new <name> <movie>\n',
            '\tnode cli-villains.js delete <id>\n'
        );
        break;
    case 'index':
        break;
    default:
        console.log('Command not found...');
        break;
}

// client.query('SELECT * FROM movie_villains;', (err, res) => {
//     console.log(err, res);
//     client.end();
// });
