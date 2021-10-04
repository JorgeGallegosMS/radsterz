const { User } = require("../models");
const bcrypt = require("bcrypt");

const userRoutes = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  signup: async (req, res) => {
    try {
      const user = await User.create(req.body);
      const {
        _doc: { _id, username },
      } = user;

      const sessionUser = {
        id: _id,
        username,
      };

      req.session.user = sessionUser;
      res.json(sessionUser);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  showUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const filteredUser = {
        id: user._id,
        username: user.username,
      };
      res.json(filteredUser);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  editUser: async (req, res) => {
    try {
      const userInfo = { ...req.body };
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        userInfo,
        { new: true }
      );

      res.json(updatedUser);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json(user);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const users = await User.find({ username });
      if (!users.length) throw new Error("Wrong username or password");
      const user = users[0];

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Wrong username or password");

      const sessionUser = {
        id: user._id,
        username: user.username,
      };

      req.session.user = sessionUser;

      res.json(sessionUser);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.json("Destroyed session");
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  checkToken: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json({ valid: true, user });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};

module.exports = userRoutes;
