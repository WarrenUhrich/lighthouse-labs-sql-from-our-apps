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

let id, villain, movie;

switch(verb) {
    case 'help':
        console.log(
            'Help for "Villain Command-Line Program:\n',
            '\tnode cli-villains.js index # Show all records\n',
            '\tnode cli-villains.js show <id> Show specific record\n',
            '\tnode cli-villains.js new <villain> <movie> # Create new record\n',
            '\tnode cli-villains.js update <id> <villain> <movie> # Update existing record\n',
            '\tnode cli-villains.js delete <id> # Delete existing record\n',
        );
        client.end();
        break;
    case 'index':
        client.query('SELECT * FROM movie_villains;')
            .then((response) => {
                // console.log(response);
                console.log(response.rows);
                client.end();
            });
        break;
    case 'show':
        id = process.argv[3];

        // client.query(`SELECT * FROM movie_villains WHERE id=${id};`)
        client.query('SELECT * FROM movie_villains WHERE id=$1;', [id])
            .then((response) => {
                // console.log(response);
                console.log(response.rows[0]);
                client.end();
            });
        break;
    case 'new':
        villain = process.argv[3];
        movie = process.argv[4];
        client.query(
                `INSERT INTO
                movie_villains(villain, movie)
                VALUES($1, $2);`,
                [villain, movie])
              .then((response) => {
                // console.log(response);
                console.log('A villain just got their origin story!');
                client.end();
              });
        break;
    case 'update':
        id = process.argv[3];
        villain = process.argv[4];
        movie = process.argv[5];
        client.query(
            'UPDATE movie_villains SET villain = $2, movie = $3 WHERE id = $1;',
            [id, villain, movie]
        ).then((response) => {
            // console.log(response);
            console.log('A villain has just changed their style!');
            client.end();
        });
        break;
}
