const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { created, forbidden, notFound } = require('../utils/responseStatus');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new NotFoundError('Пользователь не существует.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный идентификатор пользователя.'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    next(new BadRequestError('Не передан email или пароль.'));
  }

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(created).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Невалидный идентификатор пользователя.'));
      } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Email занят.'));
      } else if (err.statusCode === notFound) {
        next(new NotFoundError('Пользователь не существует.'));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail(() => new NotFoundError('Пользователь не существует.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный идентификатор пользователя.'));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail(() => throw new NotFoundError('Пользователь не существует.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный идентификатор пользователя.'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError('Не передан email или пароль.'));
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не существует.');
      }

      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        throw new ForbiddenError('Не правильный email или пароль.');
      }

      return generateToken({ _id: user._id }, '7d');
    })
    .then((token) => {
      res.send({ token });
    })
    .catch((err) => {
      if (err.statusCode === forbidden) {
        next(new ForbiddenError('Не правильный email или пароль.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
