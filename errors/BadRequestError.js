const { badRequest } = require('../utils/responseStatus');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = badRequest;
  }
}

module.exports = BadRequestError;
