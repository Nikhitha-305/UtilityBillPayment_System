const express = require('express');
const { addPayment, addUrgentPayment } = require('../services/paymentService');
const router = express.Router();

router.post('/pay', addPayment);
router.post('/urgent', addUrgentPayment);

module.exports = router;
