const { appendFile } = require('fs');
const pg = require('pg');

const Client = pg.Client;

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'dbuser',
    database: 'sql_from_apps',
    port: 5432
};

const client = new Client(config);

client.connect();

// client.query('SELECT * FROM movie_villains;')
//     .then((response) => {
//         console.log('Response received!');
//         // console.log(response); // Full Response object.
//         console.log('Response Rows:', response.rows);
//         client.end(); // Usually only used in terminal applications.
//     })
//     .catch((error) => { console.error(error); });

const verb = process.argv[2];
let villainID;
let villain;
let movie;

switch (verb) {
    case 'help':
        console.log(
            'Help for Villain CRUD program:\n',
            '\tnode cli-villains.js index # Display All\n',
            '\tnode cli-villains.js show <id> # Display Specific Villain\n',
            '\tnode cli-villains.js new <villain> <movie> # Create New Villain\n',
            '\tnode cli-villains.js edit <id> <villain> <movie> # Edit Existing Villain\n',
            '\tnode cli-villains.js delete <id> # Delete Specific Villain\n'
        );
        break;
    case 'index':
        client.query('SELECT * FROM movie_villains;')
            .then((response) => {
                console.log(response.rows);
                client.end(); // Usually only used in terminal applications.
            });
        break;
    case 'show':
        villainID = process.argv[3];
        // PREVENT SQL INJECTION ATTACKS!
        // Avoid string interpolation, use numbered placeholders and an array.
        client.query('SELECT * FROM movie_villains WHERE id = $1;', [villainID])
            .then((response) => {
                console.log(response.rows[0]);
                client.end(); // Usually only used in terminal applications.
            });
        break;
    case 'new':
        villain = process.argv[3];
        movie = process.argv[4];
        // PREVENT SQL INJECTION ATTACKS!
        // Avoid string interpolation, use numbered placeholders and an array.
        client.query('INSERT INTO movie_villains(villain, movie) VALUES($1, $2);', [villain, movie])
            .then((response) => {
                console.log('New villain added:', villain, 'From:', movie);
                client.end(); // Usually only used in terminal applications.
            });
        break;
    case 'edit':
        villainID = process.argv[3];
        villain = process.argv[4];
        movie = process.argv[5];
        client.query('UPDATE movie_villains SET villain = $2, movie = $3 WHERE id = $1;', [villainID, villain, movie])
            .then((response) => {
                console.log('Villain with ID:', villainID, 'Updated:', villain, 'From:', movie);
                client.end(); // Usually only used in terminal applications.
            });
        break;
}
