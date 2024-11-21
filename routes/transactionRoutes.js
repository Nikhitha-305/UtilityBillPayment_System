const express = require('express');
const { getTransactions, undoTransaction } = require('../services/paymentService');
const router = express.Router();

router.get('/', getTransactions);
router.post('/undo', undoTransaction);

module.exports = router;
