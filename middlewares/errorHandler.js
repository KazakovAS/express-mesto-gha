const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(err.statusCode).send({ message: 'Что-то пошло не так' });
  }

  next();
};

module.exports = errorHandler;
