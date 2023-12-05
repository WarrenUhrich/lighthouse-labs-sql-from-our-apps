const pg = require('pg');
const Client = pg.Client;

const config = {
    host:     'localhost',
    port:     5432,
    database: 'sql_from_our_apps',
    user:     'dbuser',
    password: 'dbuser'
};

const client = new Client(config);
client.connect();

const args = process.argv.slice(2);
// console.log(args);

const command = args[0];

switch(command) {
    case 'help':
        console.log(`
            node movie-villains.js help # Display available commands.
            node movie-villains.js index # List all villains.
            node movie-villains.js show <id> # Show specific villain.
            node movie-villains.js edit <id> <name> <movie> # Replace name / movie for specific villain.
            node movie-villains.js create <name> <movie> # Create a new villain.
            node movie-villains.js delete <id> # Delete specific villain.
        `);
        break;
    case 'index':
        break;
    case 'show':
        break;
    case 'edit':
        break;
    case 'create':
        break;
    case 'delete':
        break;
    default:
        console.log('Invalid command; consider asking for help.');
        break;
}

// client.query('SELECT * FROM movie_villains;') // Queries DB async.
//       .then((results) => { // When the query is done, we can do stuff!
//         // console.log('results', results);
//         console.log(results.rows);
//         client.end();
//       });

client.end();
