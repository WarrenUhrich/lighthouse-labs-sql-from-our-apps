const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Middleware.
app.use(morgan('dev'));



// Listener.
app.listen(port, () => {
    console.log('CRUD app is listening on port:', port);
});
