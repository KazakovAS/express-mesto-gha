const { unauthorized } = require('../utils/responseStatus');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = unauthorized;
  }
}

module.exports = UnauthorizedError;
