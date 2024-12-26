const express = require('express');
const router = express.Router();

const { getProducts } = require('../controllers/getProducts');

router.post('/getProduct',getProducts);

module.exports = router;