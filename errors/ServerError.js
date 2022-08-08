const { serverError } = require('../utils/responseStatus');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = serverError;
  }
}

module.exports = ServerError;
