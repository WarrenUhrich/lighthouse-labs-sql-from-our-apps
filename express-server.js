const express = require('express');
const morgan = require('morgan');

const PORT = 8080;
const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log(`Express app listening on: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.end('Hello, World!');
});
