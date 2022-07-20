const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authorization = require('./middlewares/authorization');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authorization);
app.use('/users', users);
app.use('/cards', cards);

app.listen(PORT);
