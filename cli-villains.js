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
        const id = process.argv[3];
        client.query(`SELECT * FROM movie_villains WHERE id = ${id};`)
            .then((response) => {
                console.log(response.rows[0]);
                client.end();
            });
        break;
}
