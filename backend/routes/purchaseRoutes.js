const express = require("express");
const purchaseController = require("../controllers/purchaseController");

const router = express.Router();

router.post('/transactions', purchaseController.createTransaction);
module.exports = router;