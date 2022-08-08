const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const {
  created,
  badRequest,
  forbidden,
  notFound,
  conflict,
  serverError,
} = require('../utils/responseStatus');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

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

  if (!email || !password) {
    return res.status(badRequest).send({ message: 'Не передан email или пароль' })
  }

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) =>  User.create({ name, about, avatar, email, password: hash }))
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

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(badRequest).send({ message: 'Не передан email или пароль' })
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error();

        error.statusCode = forbidden;
        throw error;
      }

      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        const error = new Error();

        error.statusCode = forbidden;
        throw error;
      }

      return generateToken({ _id: user._id }, '7d');
    })
    .then((token) => {
      res.send({ token });
    })
    .catch((err) => {
      if (err.statusCode === forbidden) {
        return res.status(forbidden).send({ message: 'Не правильный email или пароль' });
      } else {
        res.status(serverError).send({ message: err.message });
      }
    })
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
