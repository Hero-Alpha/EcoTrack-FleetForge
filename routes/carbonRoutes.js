const express = require("express");
const router = express.Router();
const carbonController = require("../controllers/carbonController");

router.get("/checkout", carbonController.renderCheckout);

module.exports = router;
