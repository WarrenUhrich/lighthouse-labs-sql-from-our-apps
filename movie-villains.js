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
        client.end();
        break;
    case 'index':
        client.query('SELECT * FROM movie_villains;') // Queries DB async.
              .then((results) => { // When the query is done, we can do stuff!
                // console.log('results', results);
                console.log(results.rows);
                client.end();
              });
        break;
    case 'show': {
            // app.get('/movie-villains/:id', (req, res) => {
            //   const id = req.params.id;
            // });
            const id = args[1];
            // NEVER DO THIS: // client.query(`SELECT * FROM movie_villains WHERE id = ${id};`) // Queries DB async.
            client.query('SELECT * FROM movie_villains WHERE id = $1;', [id]) // Queries DB async.
                .then((results) => {
                    const movieVillain = results.rows[0];
                    console.log(movieVillain);
                    client.end();
                });
        
        } break;
    case 'edit': {
            const id = args[1];
            const name = args[2];
            const movie = args[3];

            client.query(`
                        UPDATE movie_villains
                        SET name='$1', movie='$2'
                        WHERE id = $3;
                  `, [name, movie, id]) // Queries DB async.
                  .then((results) => {
                      console.log('The villain has changed their style.');
                      client.end();
                  });
        } break;
    case 'create': {
            const name = args[1];
            const movie = args[2];

            client.query(`
                        INSERT INTO movie_villains(name, movie)
                        VALUES('$1', '$2');
                `, [name, movie]) // Queries DB async.
                .then((results) => {
                    console.log('A new villain is born! 😈');
                    client.end();
                });
        } break;
    case 'delete': {
            const id = args[1];

            client.query('DELETE FROM movie_villains WHERE id = $1;', [id]) // Queries DB async.
                .then((results) => {
                    console.log('The villain has been defeated... 😢');
                    client.end();
                });
        } break;
    default:
        console.log('Invalid command; consider asking for help.');
        client.end();
        break;
}
