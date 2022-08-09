const { notFound } = require('../utils/responseStatus');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFound;
  }
}

module.exports = NotFoundError;
