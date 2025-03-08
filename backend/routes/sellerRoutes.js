const express = require("express");
const sellerController = require("../controllers/sellerController");

const router = express.Router();

router.post("/", sellerController.createSeller);

module.exports = router;