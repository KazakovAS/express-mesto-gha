const { checkToken } = require('../utils/jwt');
const User = require('../models/user');
const { unauthorized, forbidden, serverError } = require('../utils/responseStatus');

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(unauthorized).send({ message: 'Авторизуйтесь для доступа' });
  }

  const token = auth.replace('Bearer ', '');

  try {
    const payload = checkToken(token);
    User.findById(payload._id)
      .then((user) => {
        if (!user) {
          const error = new Error();

          error.statusCode = forbidden;
          throw error;
        }

        req.user = { _id: user._id };

        next();
      })
      .catch((err) => {
        if (err.statusCode === forbidden) {
          return res.status(forbidden).send({ message: 'Не правильный email или пароль' });
        } else {
          res.status(serverError).send({ message: err.message });
        }
      })
  } catch(err) {
    return res.status(unauthorized).send({ message: 'Авторизуйтесь для доступа' });
  }
};

module.exports = { isAuthorized };
