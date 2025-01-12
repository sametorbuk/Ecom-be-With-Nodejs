const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.post("/pay-start", paymentController.initiate3DPayment);
router.post("/3d-callback", paymentController.verify3DSecurePayment);

module.exports = router;
