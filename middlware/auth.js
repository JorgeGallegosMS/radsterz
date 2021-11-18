const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../vars");

const checkAuth = (req, res, next) => {
  const cookie = req.cookies.session;

  jwt.verify(cookie, jwtSecret, (err, token) => {
    if (err) return res.json({ error: "You must be logged in to do that" });

    req.userId = token._id;
    next();
  });

  // const token = jwt.verify(cookie, jwtSecret);
  // console.log(token);

  // req.userId = token._id;
  // next();
};

module.exports = checkAuth;
