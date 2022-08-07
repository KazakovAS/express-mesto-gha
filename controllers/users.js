const User = require('../models/user');
const {
  created,
  badRequest,
  notFound,
  conflict,
  serverError,
} = require('../utils/responseStatus');

const MONGO_DUPLICATE_ERROR_CODE = 11000;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(serverError).send({ message: err.message }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error();

      error.statusCode = notFound;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Невалидный идентификатор пользователя.' });
      } else if (err.statusCode === notFound) {
        res.status(notFound).send({ message: 'Пользователь не существует.' });
      } else {
        res.status(serverError).send({ message: err.message });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  User.create({ name, about, avatar, email, password })
    .then((user) => res.status(created).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Невалидный идентификатор пользователя.' });
      } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        res.status(conflict).send({ message: 'Email занят.' });
      } else if (err.statusCode === notFound) {
        res.status(notFound).send({ message: 'Пользователь не существует.' });
      } else {
        res.status(serverError).send({ message: err.message });
      }
    });
};

const updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error();

      error.statusCode = notFound;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Невалидный идентификатор пользователя.' });
      } else if (err.statusCode === notFound) {
        res.status(notFound).send({ message: 'Пользователь не существует.' });
      } else {
        res.status(serverError).send({ message: err.message });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail(() => {
      const error = new Error();

      error.statusCode = notFound;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Невалидный идентификатор пользователя.' });
      } else if (err.statusCode === notFound) {
        res.status(notFound).send({ message: 'Пользователь не существует.' });
      } else {
        res.status(serverError).send({ message: err.message });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
