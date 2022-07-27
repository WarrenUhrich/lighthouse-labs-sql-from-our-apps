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
let id;
let villain;
let movie;

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
        client.end();
        break;
    case 'index':
        client.query('SELECT * FROM movie_villains;', (err, res) => {
            console.log(res.rows);
            client.end();
        });
        break;
    case 'show':
        id =  process.argv[3];
        client.query('SELECT * FROM movie_villains WHERE id=$1;', [id])
            .then((response) => {
                console.log(response.rows[0]);
                client.end();
            });
        break;
    case 'edit':
        id =  process.argv[3];
        villain = process.argv[4];
        movie = process.argv[5];
        client.query('UPDATE movie_villains SET villain=$2, movie=$3 WHERE id=$1;', [id, villain, movie])
            .then((response) => {
                console.log('The movie villain has been updated.');
                client.end();
            });
        break;
    default:
        console.log('Command not found...');
        client.end();
        break;
}
