const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный идентификатор пользователя.' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Пользователь не существует.' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Невалидный идентификатор пользователя.' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Пользователь не существует.' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный идентификатор пользователя.' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Пользователь не существует.' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный идентификатор пользователя.' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Пользователь не существует.' });
      } else {
        res.status(500).send({ message: err.message });
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
