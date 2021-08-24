const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/db.config');
const wordRouter = require('./routes/word.routes');

const app = express();
const apiPort = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World2!');
});

app.use('/api', wordRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));