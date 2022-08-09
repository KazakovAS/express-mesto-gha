const { conflict } = require('../utils/responseStatus');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflict;
  }
}

module.exports = ConflictError;
