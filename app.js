const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const authorization = require('./middlewares/authorization');
const errorHandler = require('./middlewares/errorHandler');
const logErrors = require('./middlewares/logErrors');
const createUser = require('./routes/createUser');
const login = require('./routes/login');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/signin', login);
app.use('/signup', createUser);

app.use(authorization);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors());
app.use(logErrors);
app.use(errorHandler);

app.listen(PORT);
