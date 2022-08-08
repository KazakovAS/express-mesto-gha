const jwt = require('jsonwebtoken');

const SECRET_KEY = 'WUBBA LUBBA DUB DUB';

const generateToken = (payload, lifetime) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: lifetime });
};

const checkToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  generateToken,
  checkToken,
};
