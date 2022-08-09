const NotFoundError = require('../errors/NotFoundError');

const notFoundPage = (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
};

module.exports = notFoundPage;
