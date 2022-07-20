const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authorization = require('./middlewares/authorization');
const pageNotFound = require('./middlewares/pageNotFound');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authorization);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(pageNotFound);

app.listen(PORT);
