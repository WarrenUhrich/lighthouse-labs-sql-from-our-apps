require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// ejs
// nodemon

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view-engine', 'ejs');

app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log('Express App Listening on Port:', PORT);
});

// All villains!
app.get('/', (req, res) => {
    
});
