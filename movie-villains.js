const pg = require('pg');
const Client = pg.Client;

const config = {
    host: 'localhost',
    port: 5432,
    database: 'sql_from_our_apps',
    user: 'dbuser',
    password: 'dbuser',
};

const client = new Client(config);
client.connect();

const args = process.argv.slice(2);
// console.log(args);

const command = args[0];
// console.log('Current command:', command);

let id, name, movie;

switch(command) {
    case 'index':
        client.query('SELECT * FROM movie_villains;')
              .then((results) => {
                const rows = results.rows;
                console.log(rows);
                client.end();
              });
        break;
    
    case 'show':
        id = args[1];
        client.query(`SELECT * FROM movie_villains WHERE id = ${id};`)
              .then((results) => {
                const movieVillain = results.rows[0];
                console.log(movieVillain);
                client.end();
              });
        break;

    case 'update':
        id = args[1];
        name = args[2];
        movie = args[3];
        client.query(`
                    UPDATE movie_villains
                    SET name = '${name}', movie = '${movie}'
                    WHERE id = ${id};
                `)
              .then((results) => {
                console.log('Villain updated.');
                client.end();
              });
        break;

    case 'delete':
        id = args[1];
        client.query(`DELETE FROM movie_villains WHERE id = ${id};`)
              .then((results) => {
                console.log('Villain defeated.');
                client.end();
              });
        break;

    case 'create':
        name = args[1];
        movie = args[2];
        client.query(`
                    INSERT INTO movie_villains(name, movie)
                    VALUES('${name}', '${movie}');
                `)
              .then((results) => {
                console.log('A new villain is born!');
                client.end();
              });
        break;

    default: // help or unknown command
        console.log(`
        Commands Available:
            
            node movie-villains.js help # Displays list of commands
            
            node movie-villains.js index # Display all villains
            
            node movie-villains.js show <id> # Display specific villain
            
            node movie-villains.js update <id> <name> <movie> # Replace existing villain's info.
            
            node movie-villains.js delete <id> # Remove specific villain from DB
            
            node movie-villains.js create <name> <movie> # Add new villain!
        `);
        client.end();
        break;
}
