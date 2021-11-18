const { User } = require("../models");
const { jwtSecret, env } = require("../vars");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoutes = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).exec();
      res.json(users);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      const { password, ...userInfo } = user.toJSON();

      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: env === "development" ? 30 : "7d",
      });

      res.cookie("session", token, {
        httpOnly: true,
        maxAge:
          env === "development"
            ? 1000 * 30 /* 30 seconds */
            : 1000 * 60 * 60 * 24 * 7, // 1 week
      });

      res.json({ user: userInfo });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  showUser: async (req, res) => {
    try {
      console.log(req.userId);
      const user = await User.findById(req.userId).exec();
      const filteredUser = {
        id: user._id,
        name: user.name,
      };
      res.json({ user: filteredUser, id: req.userId });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  editUser: async (req, res) => {
    try {
      const userData = { ...req.body };
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        userData,
        { new: true }
      ).exec();

      const { password, ...userInfo } = updatedUser;

      res.json(userInfo);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id).exec();
      res.json(user);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const users = await User.find({ email: req.body.email }).exec();
      if (!users.length) return res.json({ error: "Wrong email or password" });
      const user = users[0];

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return res.json({ error: "Wrong email or password" });

      const { _id, name, email } = await user.toJSON();

      const token = jwt.sign({ _id }, jwtSecret, {
        expiresIn: env === "development" ? 30 : "7d",
      });

      res.cookie("session", token, {
        httpOnly: true,
        maxAge:
          env === "development"
            ? 1000 * 30 /* 30 seconds */
            : 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: env !== "development",
      });

      return res.json({ user: { id: _id, name, email } });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  logout: async (req, res) => {
    res.cookie("session", "", { maxAge: 0 });
    res.redirect("/api/users/checkUser");
  },
  getUser: async (req, res) => {
    try {
      if (!req.userId)
        return res.json({
          error: "You must be logged in to do that",
        });
      const user = await User.findOne({ _id: req.userId }).exec();

      const { _id, name, email } = user.toJSON();
      return res.json({ user: { id: _id, name, email } });
    } catch (error) {
      return res.json({ error: "You must be logged in to do that" });
    }
  },
};

module.exports = userRoutes;
