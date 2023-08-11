const express = require('express');
const {checkout, paymentVerifation, getKey} = require('../services/paymentServices.js')

const router = express.Router();

router.post('/checkout', checkout)
router.post('/payment-verify', paymentVerifation)
router.get('/get-key', getKey)


module.exports = router;