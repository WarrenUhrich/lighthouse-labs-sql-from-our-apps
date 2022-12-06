const express = require('express');

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
    console.log(`Express app listening on: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.end('Hello, World!');
});
