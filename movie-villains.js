/**
 * Handle connection to database.
 */

const pg = require('pg');
const Client = pg.Client;

const config = {
    host: 'localhost',
    user: 'dbuser',
    password: 'dbuser',
    database: 'sql_from_our_apps',
    port: 5432
};

const client = new Client(config);
client.connect(); // Will throw an error if it can't connect.

/**
 * Handle command-line args.
 */

const args = process.argv.slice(2); // remove `node` and `movie-villains.js`
// console.log('args:', args);

const command = args[0];

switch(command) {
    case 'index':
        client
            .query('SELECT * FROM movie_villains;')
            .then((result) => {
                // console.log('db result:', result);
                const movieVillains = result.rows; // Array of DB result rows.
                console.log(movieVillains);
                client.end(); // Ends the connection.
            });
        break;

    case 'show':{
        const id = args[1];

        // http://mywebsite.website/tweets/DROP TABLE tweets;

        client
            // The second argument in query can be used to sanitize our user input values.
            .query('SELECT * FROM movie_villains WHERE id = $1;', [id])
            .then((result) => {
                // console.log('db result:', result);
                const movieVillain = result.rows[0]; // First (only) item of DB result rows.
                console.log(movieVillain);
                client.end(); // Ends the connection.
            });
        break;}

    case 'delete':{
        const id = args[1];
        client
            .query('DELETE FROM movie_villains WHERE id = $1;', [id])
            .then((result) => {
                // console.log('db result:', result);
                console.log('Villain defeated!');
                client.end(); // Ends the connection.
            });
        break;}

    case 'create':{
        const name = args[1];
        const movie = args[2];
        client
            .query("INSERT INTO movie_villains(name, movie) VALUES($1, $2);", [name, movie])
            .then((result) => {
                // console.log('db result:', result);
                console.log('A new villain is born!');
                client.end(); // Ends the connection.
            });
        break;}

    case 'update':{
        const id = args[1];
        const name = args[2];
        const movie = args[3];
        client
            .query('UPDATE movie_villains SET name=$2, movie=$3 WHERE id = $1;', [id, name, movie])
            .then((result) => {
                // console.log('db result:', result);
                console.log('Villain has been updated!');
                client.end(); // Ends the connection.
            });
        break;}

    default:
        console.log(`
        
movie-villains.js help doc:
---------------------------

node movie-villains.js help  # Display the available commands
node movie-villains.js index # List all villains
node movie-villains.js show <id> # Show one villain by ID
node movie-villains.js delete <id> # Delete villain by ID
node movie-villains.js create <name> <movie> # Create new villain
node movie-villains.js update <id> <newName> <newMovie> # Update existing villain
        
        `);
        client.end(); // Ends the connection.
        break;
}


