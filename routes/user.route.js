const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const checkAuth = require("../middlware/auth");

// Get all users
router.get("/", userController.getAllUsers);

// Authenticate
router.get("/checkUser", checkAuth, userController.getUser);

// Create new user
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

// Logout
router.post("/logout", userController.logout);

// Put /:id routes after /mdjsada routes

// Show user
router.get("/:id", checkAuth, userController.showUser);

// Edit user
router.put("/:id", userController.editUser);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
