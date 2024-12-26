const express = require('express');
const router = express.Router();

const { searchProducts } = require('../controllers/productHandler');

router.get('/search/:searchWord',searchProducts);

module.exports = router;