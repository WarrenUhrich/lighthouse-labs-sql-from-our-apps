# Lighthouse Labs | SQL from our Apps

[GitHub Repository Branch](https://github.com/WarrenUhrich/lighthouse-labs-sql-from-our-apps/tree/2022.12.06-web-flex-day-19sept2022) | [Vimeo Video Recording](https://vimeo.com/778632628/d2086cfbdd)

* [X] Placing the Final Piece into the Stack
* [X] Connecting to a Database in Node.js
* [X] Executing SQL Queries in Node.js
* [X] Start a Basic CRUD App (Node.js, and Express)

## To Run these Examples:

First set up an appropriate database and table, see: `/data/setup.sql`. Create a `.env` file and populate it with your credentials.

### Command-Line Application

Ensure the connection details in `cli-villains.js` are updated for your environment.

Run any of the following to execute CRUD operations via the terminal:

* `node cli-villains.js help # Display available commands`
* `node cli-villains.js index # List all villains`
* `node cli-villains.js show <ID> # Show single villain by ID`
* `node cli-villains.js new <NAME> <MOVIE> # Create a new villain`
* `node cli-villains.js edit <ID> <NAME> <MOVIE>`
* `node cli-villains.js delete <ID> # Delete villain by ID`

### Web Application

1. `npm install`
2. Fill in the `.env` file if you have not already.
3. `npm run serve`
4. [Visit the Villains Index](http://localhost:3000/movie-villains) (default: http://localhost:3000/movie-villains)

## The Complete Picture

As full-stack developers, we aim to build web pages and web applications that may range in complexity. A full-stack application most often includes the following pieces:

* Front-End
    * HTML
    * CSS
    * JS
* Back-End
    * Application
    * Database

Up until this point, every in-class example we've built together has either been focused on just one of these pieces alone, or a combination of *some* pieces. Today? We finally open that door to really incorporating all pieces in a single project. Today, we build an application that is capable of server-side logic, serving any necessary front-end assets, and can even incorporate a database of our own.

## Plan of Action!

CRUD / Create - Read - Update - Delete

* `node cli-villains.js index` # List all villains.
* `node cli-villains.js show <id>` # Show specific villain.
* `node cli-villains.js edit <id> <name> <movie>` # Edit specific villain.
* `node cli-villains.js new <name> <movie>` # New villain.
* `node cli-villains.js delete <id>` # Remove specific villain.

## Connecting Postgres Databases to node.js

Now, we won't always be able to easily connect to all database systems out of the box with every server-side scripting language we try. We may have to research plugins, extensions, and/or packages that help us connect properly. In today's example, we'll be exploring the use of node.js to connect to a PostgreSQL database, and for this we'll be making use of the [`node-postgres`](https://node-postgres.com/) npm package.

Let's consider the [following snippet from their connection guide](https://node-postgres.com/features/connecting#programmatic):

```JavaScript
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})
```

You'll notice that the documentation provides information for setting up a **pool** or a **client**. What's the difference? Do we need both?

We should make a decision on a case-by-case basis. An important distinction we need to make is that a client is a single connection that can handle only one request at a time. This is less resource-intensive, but can cause perceivable delays if many people are making requests involving the database at the same time. Because a client uses a single connection, requests must be executed one-at-a-time and in-order.

In contrast, pool is a managed collection of clients. It is more for our server to keep track of, but it can support concurrent clients / connections, each capable of making connections if/as needed. In this package's case, our pool is considered managed, as it is hands-off for us. We don't have to worry directly about allocating and de-allocating connections ourselves, it does all this work for us.

Let's look at a client connection in today's example, but note you'll likely have to try pools soon too!

Let's write our own file:

```JavaScript
const pg = require('pg');

const Client = pg.Client;
// Equivalent to: const {Client} = pg;

const config = {
  host: 'localhost',
  user: 'labber',
  password: 'pass123',
  database: 'sql_from_apps',
  port: 5432

};

const client = new Client(config);

client.connect();

client.query('SELECT * FROM movie_villains;')
  .then((response) => {
    console.log(response);
  });
```

Ensure that the `config` object matches **your** environment, and that the `client.query` SQL statement is asking for a valid table.

Notice that running the file in our terminal leads to us maintaining that database connection, and we are not released to our command-line again. This can be stopped via the inclusion of `client.end();`, but this is only recommended for command-line scripts. In most real web application use-cases, you'll want your connections to persist with your application.

The `response` object we see in our output has a lot of properties and information, but pay special mind to the `rows` property. This is most often what you'll want to use in your applications, as it is an effective way for us to read the data we've received from our database.

Changing the log to read, `console.log(response.rows);`, we'll find a much more succinct output that is specialized to what we're hoping to find.

## The Goal for Today

Let's make a quick plan for our application, we want to know what we're building today. Let's try to make a basic command-line program that is capable of accepting an argument (or arguments) and can interact with our database.

Let's suppose the following instructions and what they might output to us in the terminal:

```BASH
node villains.js index # List all villains.
node villains.js show 3 # Show villain 3.
node villains.js update 3 'New Name'  # Change name of villain 3.
node villains.js delete 3 # Remove villain 3.
```

## CRUD

To achieve our goal, let's make sure we are accepting user input. We'll want to grab the verb passed in via the command-line and decide which query and output to use. For this decision, we could use `if` statements or a `switch`.

It can be helpful to include a `help` command, so let's do that too, it will be easy to see how we're progressing on our plan this way.

```JavaScript
const verb = process.argv[2];

switch (verb) {
  case 'help':
    console.log(
      'Help for Villain Command-Line Program:\n',
      '\tnode cli-villains.js index # List all villains.\n',
      '\tnode cli-villains.js show <id> # Show specific villain.\n',
      '\tnode cli-villains.js edit <id> <name> <movie> # Edit specific villain.\n',
      '\tnode cli-villains.js new <name> <movie> # New villain.\n',
      '\tnode cli-villains.js delete <id> # Remove specific villain.\n'
    );
    break;
  case 'index':
    client.query('SELECT * FROM movie_villains;')
      .then((response) => {
        console.log(response.rows);
        client.end();
      });
    break;
  default:
    console.log('Invalid verb.');
    break;
}
```

Note in the above code, we have moved the `client.query()` from our previous experiment into the switch. One of our goals has already been reached!

### Read

Let's hone in on the specific case in our `switch` for ***reading*** a specific record:

```JavaScript
case 'show':
  const id = process.argv[3];
  client.query(`SELECT * FROM movie_villains WHERE id = ${id};`)
    .then((response) => {
      console.log(response.rows[0]);
    });
    client.end();
  break;
```

Awesome! This works. Now we can even read individual villain names.

#### SQL Injection

Notice that we take the user input directly, and place it into our query string. This makes us vulnerable to SQL injection attacks. Unfortunately, there are many websites out in the wild that are susceptable to exactly this! Consider our application, and what might happen if we ran the following in our terminal:

```BASH
node villains.js show '1; DROP TABLE movie_villains;'
```

A clever end-user, or hacker, can take advantage of vulnerabilities like this to read information they shouldn't, add malicious records, change existing records, or even delete your database records!

##### Preventing SQL Injections

There are a variety of ways to prevent this type of attack, it should be something you're diligent in watching for.

In a case like we have here, where we want to deal with only ID numbers, we might be able to get away with a change like this:

```JavaScript
const id = parseInt(process.argv[3]);
```

The change above is simple... but will prevent complex strings that may contain SQL statements. It will keep to numbers! Much safer. This doesn't really scale well with other cases that will come up, though. Not all information we accept from users for use in queries will just be a number... we want to collect names, e-mail addresses, and all sorts of stuff! What do we do in those cases?

Most libraries offer ways of sanitizing your data before they are executed as SQL statements. Please always explore any database library you use for how to carry this out!

In the case of node-postgres, their sanitization process looks something like so:

```JavaScript
client.query(
  'SELECT * FROM movie_villains WHERE id = $1;',
  [id]
)
```

We simplify our string, and use a placeholder value. The actual values we want included in our statement instead reside in an array we pass to the second argument.

In our string, we use `$` followed by a number to represent which value in the array we want to access. Note that this array, the library has decided, will start with `1` instead of `0` like we're used to!

### Update

```JavaScript
const verb = process.argv[2];
const id = process.argv[3]; // Move up here to avoid conflict throughout switch.
const name = process.argv[4];

switch (verb) {
  case 'help':
    console.log(
      'Help for Villain Command-Line Program:\n',
      '\tnode cli-villains.js index # List all villains.\n',
      '\tnode cli-villains.js show <id> # Show specific villain.\n',
      '\tnode cli-villains.js edit <id> <name> <movie> # Edit specific villain.\n',
      '\tnode cli-villains.js new <name> <movie> # New villain.\n',
      '\tnode cli-villains.js delete <id> # Remove specific villain.\n'
    );
    break;
  case 'index':
    client.query('SELECT * FROM movie_villains;')
      .then((response) => {
        console.log(response.rows);
        client.end();
      });
    break;
  case 'show':
    client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
      .then((response) => {
        console.log(response.rows[0]);
      });
      client.end();
    break;
  case 'update':
    client.query('UPDATE movie_villains SET villain = $2 WHERE id = $1;', [id, name])
      .then((response) => {
        console.log(`Villan ${id} updated successfully.`);
      });
    client.end();
    break;
  default:
    console.log('Invalid verb.');
    break;
}
```

### Create

```JavaScript
const verb = process.argv[2];
const id = process.argv[3]; // Move up here to avoid conflict throughout switch.
const name = process.argv[4];

switch (verb) {
  case 'help':
    console.log(
      'Help for Villain Command-Line Program:\n',
      '\tnode cli-villains.js index # List all villains.\n',
      '\tnode cli-villains.js show <id> # Show specific villain.\n',
      '\tnode cli-villains.js edit <id> <name> <movie> # Edit specific villain.\n',
      '\tnode cli-villains.js new <name> <movie> # New villain.\n',
      '\tnode cli-villains.js delete <id> # Remove specific villain.\n'
    );
    break;
  case 'index':
    client.query('SELECT * FROM movie_villains;')
      .then((response) => {
        console.log(response.rows);
        client.end();
      });
    break;
  case 'show':
    client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
      .then((response) => {
        console.log(response.rows[0]);
      });
      client.end();
    break;
  case 'update':
    client.query('UPDATE movie_villains SET villain = $2 WHERE id = $1;', [id, name])
      .then((response) => {
        console.log(`Villan ${id} updated successfully.`);
      });
    client.end();
    break;
  case 'new':
    const villainName = process.argv[3];
    const villainMovie = process.argv[4];
    client.query('INSERT INTO movie_villains(villain, movie) VALUES($1, $2);', [villainName, villainMovie])
      .then((response) => {
        console.log(`Villan added successfully.`);
      });
    client.end();
    break;
  default:
    console.log('Invalid verb.');
    break;
}
```

### Delete

```JavaScript
case 'delete':
  client.query('DELETE FROM movie_villains WHERE id = $1;', [id])
    .then((response) => {
      console.log(`Villan deleted successfully.`);
    });
  client.end();
  break;
```

## Converting to an Express App

Amazing! Now to apply this to an Express app and really see this final piece fall into its rightful place in your full-stack toolbelt.

### Express Quickstart

Create a `.gitignore` so you don't accidentally commit or push your `/node_modules` directory!

```BASH
npm init -y # Inputs defaults for package.json.
npm install pg express morgan ejs
```

Once modules are available, let's create our `server.js` file:

```JavaScript
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 12345;

// Middleware.
app.use(morgan('dev'));

// Routes.
// To-do...

// Listener.
app.listen(port, () => {
  consol.log('App is listening on port:', port);
});
```

The above should listen for requests, but doesn't do much with them yet. It acts as a great jumping-off point for next steps!

### Connecting the Database (Again!)

We want to get in the habit of separating concerns. Things like database connection and routes can take up considerable space in our `server.js`, and some of these sorts of things may need to be re-used elsewhere. We want to reduce clutter, and keep our code DRY! Let's create a separate file just for handling our database connection. Once that is ready-to-go, we can require it in our `server.js`. Create a `connection.js` file, consider placing it in a `database` folder for additional organization.

At this point, it might look something like this:

***database/connection.js***

```JavaScript
const pg = require('pg');
const Client = pg.Client;

const config = {
  host: 'localhost',
  user: 'labber',
  password: 'pass123',
  database: 'sql_from_apps',
  port: 5432

};

const client = new Client(config);

client.connect();
```

This is actually quite a problem... especially when API keys and information of that nature come into play. Think about it, if we push this code, there will be a GitHub repository out there with all of our credentials for this database! Maybe this doesn't seem like such a big deal when we're doing a local test like this, but for anything that is publically accessible at all (which many databases are, they are just password-protected) this is an incredible security flaw that must be addressed!

Made the mistake of pushing this sort of code? The worries don't end there... bots exist that explore GitHub repositories at all hours of the day for exploitable mistakes like this. Because repositories feature commit histories, they can even find such vulnerabilities in past commits!

Because of all the potential ways this can go wrong, we should get in the habit of, from the start, using environment variables for sensitive information.

What are environment variables, you ask?

## Environment Variables

We can use a `.env` file to store sensitive information in our project. For easily incorporating this in our projects, it helps to make use of the [dotenv](https://www.npmjs.com/package/dotenv) npm package.

```BASH
npm install dotenv
```

For this approach to be secure at all, we'll also need to ensure that this environment file is included in our `.gitignore` file:

***.gitignore***

```.gitignore
/node_modules

.env
```

Once installed, we can start defining our information here, instead of directly in our connection info. Consider the following `.env` contents (this should be in the root of your project):

***.env***

```ENV
PORT=5000
DBUSER=labber
DBPASS=pass123
DBHOST=localhost
DBPORT=5432
DBNAME=sql_from_apps
```

This is a great step that will allow us to access these values throughout our app, all without pushing them to our repository! There is one more thing we can do as a kindness for both ourselves and our team members, however. This is the practice of adding a blank `.env` file template, that instructs the next developer (or yourself down the road) what should be included in your environment file. In the case of our current project, one might set up the following template:

***.env.example***

```ENV
PORT=
DBUSER=
DBPASS=
DBHOST=
DBPORT=
DBNAME=
```

Note that this template is not included in the `.gitignore` file! When you next clone this project, or someone else downloads it, they'll at least have an idea as to what sort of values are required in order to properly run it. In addition to this, it is considered an even better practice to make notes in your project's README to further guide and encourage creation of the `.env` file (and any other necessary steps.)

Now that we have our `.env` file populated, we can update our `database/connection.js` file so that it no longer contains our sensitive information:

***database/connection.js***

```JavaScript
const pg = require('pg');
const Client = pg.Client;

const config = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  port: process.env.DBPORT

};

const client = new Client(config);

client.connect();
```

Note how this is both more secure, and easy to customize project-wide. If you needed any of this info in any other files now, it will match. Change in one place: affect in many! Keepin' it DRY.

## Creating Query Functions

This step is optional in the big scheme of things, but we want you to get in the habit of breaking things into smaller, more manageable pieces where you can. It is difficult to read and understand hundreds or thousands of lines of code per-file... so we make an effort to start breaking our projects into smaller, more modular, more re-usable pieces! This helps with organization, legibility, and helps to make it easier for us to use code elsewhere with less effort. Let's consider our command-line interface application and focus on a couple of its main features, to start. It could read a list of all villains (index) or display information for specific ones (show.) Let's reproduce these as stand-alone functions inside of a new file. We can later `require` these if/as needed.

***database/villains-queries.js***

```JavaScript
const {client} = require('./connection');

const getVillains = () => {
    return client.query('SELECT * FROM movie_villains;')
        .then((response) => {
            return response.rows;
        });
};

const getVillainById = (id) => {
    return client.query(
        'SELECT * FROM movie_villains WHERE id = $1;',
        [id]
    )
        .then((response) => {
            return response.rows[0];
        });
};

module.exports = {
    getVillains,
    getVillainById
};

```

We'll just past in here our previous queries, keeping in mind that the client query returns a promise... this means that where we call upon these functions, we'll have to be mindful that we should attach `.then()` methods to make use of what we're trying to pass on. In both above cases, we're trying to send villain data, either as an array of objects or a single object, respectively.

We do need to export this, like our connections, if we want to make use of it elsewhere.

## Bringing it all Together

Let's now load our functions into our `index.js` (or `server.js`, if you called it that.) Here we can set up routes like we normally would and send the appropriate responses to requesting clients. 

```JavaScript
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const villainQueries = require('./database/villain-queries');
const {getVillains, getVillainById} = villainQueries;

const app = express();
const port = process.env.PORT || 3000;

// app.set('view engine', 'ejs');

// Middleware.
app.use(morgan('dev'));

// Routes.

app.get('/villains', (req, res) => {
    getVillains()
        .then((villains) => {
            res.json(villains);
            // res.render('villains/index', {villains});
        });
});

app.get('/villains/:id', (req, res) => {
    getVillainById(req.params.id)
        .then((villain) => {
            res.json(villain);
            // res.render('villains/show', {villain});
        });
});

// Listener.
app.listen(port, () => {
    console.log('CRUD app is listening on port:', port);
});

```

Notice we're using `process.env` for our port now, to help keep configuration of the application all in one place. This is the beginnings of a full-stack web application!

Your next steps are utilizing views, and bringing in the *full* set of CRUD operations available in our command-line application.

## Resources

* [`node-postgres`](https://node-postgres.com/)
* [`dotenv`](https://www.npmjs.com/package/dotenv)
* [Express](https://expressjs.com/)
* [ejs](https://ejs.co/)
* [LogRocket (node.js / PostgreSQL / CRUD / REST / API / Example)](https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/)
