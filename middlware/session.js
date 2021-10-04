const { env, sessionSecret } = require("../vars");

// Redis + Express session setup
const session = require("express-session");
const connectRedis = require("connect-redis");
const RedisStore = connectRedis(session);
const redisClient = require("../db/radsterzRedis");

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: sessionSecret,
  saveUninitialized: false,
  resave: false,
  name: "sessionId",
  cookie: {
    secure: env !== "development",
    httpOnly: true,
    maxAge: 1000 * 60,
  },
});
