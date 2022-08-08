const { forbidden } = require('../utils/responseStatus');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbidden;
  }
}

module.exports = ForbiddenError;
