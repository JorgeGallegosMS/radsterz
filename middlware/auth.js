const checkAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    const error = new Error("You need to be logged in to do that");
    next(error);
  }
  next();
};

module.exports = checkAuth;
