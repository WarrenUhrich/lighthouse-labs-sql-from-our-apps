const pg = require('pg');
const Client = pg.Client;

const dbConfig = {
    user: 'dbuser',
    password: 'dbuser',
    host: 'localhost',
    database: 'postgres',
    port: 5432
};

const client = new Client(dbConfig);

client.connect();

// node cli-villains.js VERB ID
const verb = process.argv[2];
const id = process.argv[3];

switch (verb) {
    case 'help':
        console.log(
            'Help for Villain Command-Line Program:\n',
            '\tnode cli-villains.js index` # List all villains.\n',
            '\tnode cli-villains.js show <id>` # Show specific villain.\n',
            '\tnode cli-villains.js edit <id> <name> <movie>` # Edit specific villain.\n',
            '\tnode cli-villains.js new <name> <movie>` # New villain.\n',
            '\tnode cli-villains.js delete <id>` # Remove specific villain.\n',
        );
        client.end();
        break;
    case 'index':
        client.query('SELECT * FROM movie_villains;')
            .then((response) => {
                console.log(response.rows);
                client.end();
            });
        break;
    case 'show':
        client.query(
                'SELECT * FROM movie_villains WHERE id = $1;',
                [id] // Array of values to sanitize.
            )
            .then((response) => {
                console.log(response.rows[0]);
                client.end();
            });
        break;
    case 'edit':
        const villainName = process.argv[4];
        const movieName = process.argv[5];
        client.query(
                `UPDATE
                    movie_villains 
                SET
                    villain = $1,
                    movie = $2
                WHERE
                    id = $3;`,
                [villainName, movieName, id] // Array of values to sanitize.
            )
            .then(() => {
                console.log('Villain #' + id + ' has been updated.');
                client.end();
            });
        break;
    case 'new':
        const newVillain = process.argv[3];
        const newMovie = process.argv[4];
        client.query(
            `INSERT INTO
                movie_villains(villain, movie)
                VALUES($1, $2);`,
            [newVillain, newMovie]
        )
            .then(() => {
                console.log(newVillain + '\'s story begins in the world of ' + newMovie + '!');
            });
        break;
}
