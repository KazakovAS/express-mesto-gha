const { checkToken } = require('../utils/jwt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const authorization = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    next(new UnauthorizedError('Необходима авторизация.'));
  }

  let payload;
  const token = auth.replace('Bearer ', '');

  try {
    payload = checkToken(token);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация.'));
  }

  req.user = payload;
  next();
};

module.exports = authorization;
