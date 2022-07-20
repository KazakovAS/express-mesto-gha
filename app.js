const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authorization = require('./middlewares/authorization');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authorization);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT);
