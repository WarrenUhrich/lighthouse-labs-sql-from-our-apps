const {  Client } = require('pg');

const config = {
    user: 'myuser',
    password: 'myuser',
    host: 'localhost',
    database: 'sql_from_our_apps',
    port: 5432,
};

const client = new Client(config);

client.connect();

const verb = process.argv[2];

let id;
let villain;
let movie;

switch (verb) {
    case 'help':
        console.log(
            'Help DOC for Movie Villain CLI CRUD Program:\n',
            '\tnode cli-villains.js index # Read all!\n',
            '\tnode cli-villains.js show <id> # Read specific entry!\n',
            '\tnode cli-villains.js edit <id> <villain> <movie> # Edit specific entry!\n',
            '\tnode cli-villains.js new <villain> <movie> # Create new entry!\n',
            '\tnode cli-villains.js delete <id> # Remove this entry!\n',
        );
        client.end();
        break;
    case 'index':
        client.query('SELECT * FROM movie_villains;')
            .then((result) => {
                // console.log(result);
                console.log(result.rows);
                client.end(); // Frees up the command-line; avoid in Express apps.
            })
            .catch((error) => {
                console.error(error);
            });
        break;
    case 'show':
        id = process.argv[3];
        // console.log(id);

        // Prevent injection attacks!!!
        client.query('SELECT * FROM movie_villains WHERE id=$1;', [id])
            .then((result) => {
                // console.log(result);
                if (result.rows[0]) {
                    console.log(result.rows[0]);
                } else {
                    console.log('Villain is missing... maybe they escaped!?')
                }
                client.end(); // Frees up the command-line; avoid in Express apps.
            })
            .catch((error) => {
                console.error(error);
            });
        break;
    case 'edit':
        id = process.argv[3];
        villain = process.argv[4];
        movie = process.argv[5];

        client.query('UPDATE movie_villains SET villain=$2, movie=$3 WHERE id=$1;', [id, villain, movie])
            .then((result) => {
                console.log('This villain was upgraded successfully; watch out!');
                client.end(); // Frees up the command-line; avoid in Express apps.
            })
            .catch((error) => {
                console.error(error);
            });
        break;
}
