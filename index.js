const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Install nodemon...
// Install ejs...

const app = express();
const PORT = 5000;

app.set('view-engine', 'ejs');

app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log('Express villains app is listening on port:', PORT);
});

app.get('/test', (req, res) => {
    res.end('Server is running; hello!');
});
