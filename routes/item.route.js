const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");
const multer = require("multer");
const upload = multer();

// Get all items
router.get("/", itemController.getAllItems);

// Create new item
router.post("/new", upload.single("image"), itemController.newItem);

// Show item
router.get("/:id", itemController.showItem);

// Edit item
router.put("/:id", upload.single("image"), itemController.editItem);

// Delete an item
router.delete("/:id", itemController.deleteItem);

module.exports = router;
