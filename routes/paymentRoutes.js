const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

const {
  initiate3dPayment,
  verify3DSecurePayment,
} = require("../controllers/paymentController");

router.post("/pay-start", initiate3dPayment);
router.post("/pay/3d-callback", verify3DSecurePayment);

module.exports = router;
