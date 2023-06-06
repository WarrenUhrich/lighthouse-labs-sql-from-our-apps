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

if('index' === command) {
    client.query('SELECT * FROM movie_villains;')
        .then((dbResponse) => {
            // console.log('dbResponse:', dbResponse);
            console.log(dbResponse.rows);
            client.end();
        });
}else if('create' === command) {
    const name = args[1];
    const movie = args[2];

    client.query(`
        INSERT INTO movie_villains(name, movie)
        VALUES('$1', '$2');
    `, [name, movie])
        .then((dbResponse) => {
            // console.log('dbResponse:', dbResponse);
            console.log('A new villain is born!');
            client.end();
        });
}else if('read' === command) {
    const id = args[1];

    client.query(`
        SELECT *
        FROM movie_villains
        WHERE id=$1;
    `, [id])
        .then((dbResponse) => {
            // console.log('dbResponse:', dbResponse);
            // Retrieve only the first row/entry
            // * there should only be ONE matching ID
            console.log(dbResponse.rows[0]);
            client.end();
        });
}else if('update' === command) {
    const id = args[1];
    const name = args[2];
    const movie = args[3];

    client.query(`
        UPDATE movie_villains
        SET
            name='$2',
            movie='$3'
        WHERE id=$1;
    `, [id, name, movie])
        .then((dbResponse) => {
            console.log('This villain has been transformed!');
            client.end();
        });
}else if('delete' === command) {
    const id = args[1];
    // console.log(args);

    client.query(`
        DELETE FROM movie_villains
        WHERE id=$1;
    `, [id])
        .then((dbResponse) => {
            console.log('Villain defeated!');
            client.end();
        });
}else{
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
}
