const { checkToken } = require('../utils/jwt');
const User = require('../models/user');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ForbiddenError = require('../errors/ForbiddenError');

const authorization = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    next(new UnauthorizedError('Необходима авторизация.'));
  }

  const token = auth.replace('Bearer ', '');

  try {
    const payload = checkToken(token);
    User.findOne({ email: payload.email })
      .then((user) => {
        if (!user) {
          throw new ForbiddenError('Не правильный email или пароль.');
        }

        req.user = payload;

        next();
      })
      .catch(next);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация.'));
  }
};

module.exports = authorization;
