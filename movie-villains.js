// const { Client } = require('pg');
// const Client = require('pg').Client;
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
const command = args[0];
// console.log(args);

if(args.length === 0) {
    console.log(`
        MOVIE VILLAINS DB CLI PROGRAM COMMANDS:
        =======================================

            $ node movie-villains.js index
                see all villains

            $ node movie-villains.js create 'name' 'movie'
                save new villain

            $ node movie-villains.js read 'id'
                show single villain

            $ node movie-villains.js update 'id' 'name' 'movie'
                update existing villain

            $ node movie-villains.js delete 'id'
                remove villain
    `);
    client.end();
}else if('index' === command) {
    client.query('SELECT * FROM movie_villains;')
        .then((dbResponse) => {
            // console.log('dbResponse:', dbResponse);
            console.log(dbResponse.rows);
            client.end();
        });
}
