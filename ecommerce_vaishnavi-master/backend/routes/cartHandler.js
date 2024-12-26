const express = require('express');
const router = express.Router();

const { addToCart, increaseCartQuantity, decreaseCartQuantity, deleteProductFromCart } = require('../controllers/cartHandler');

router.post('/addToCart/:userId/:productId',addToCart);
router.put('/increaseQuantity/:userId/:productId',increaseCartQuantity);
router.put('/decreaseCartQuantity/:userId/:productId',decreaseCartQuantity);
router.delete('/deleteProductFromCart/:userId/:productId',deleteProductFromCart);

module.exports = router;