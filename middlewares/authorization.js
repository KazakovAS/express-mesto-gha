const authorization = (req, res, next) => {
  req.user = {
    _id: '62d67b6175274edecdca9540',
  };

  next();
};

module.exports = authorization;
