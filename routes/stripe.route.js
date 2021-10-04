const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe.controller");

router.post("/checkout", stripeController.checkout);

module.exports = router;
