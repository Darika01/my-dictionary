const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const db = require('./config/dBConfig');
const userRouter = require('./routes/userRouter');
const dictionaryRouter = require('./routes/dictionaryRouter');
const wordRouter = require('./routes/wordRouter');

const app = express();
const apiPort = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(bodyParser.json());
app.use(cookieParser());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World2!');
});
// app.setHeader('Content-Type', 'application/json');

app.use('/api', userRouter);
app.use('/api', dictionaryRouter);
app.use('/api', wordRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
