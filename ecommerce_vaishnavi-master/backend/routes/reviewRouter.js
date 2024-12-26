const express = require('express');
const router = express.Router();
const { writeReview } = require('../controllers/reviewController');
const { viewReviews } = require('../controllers/viewReview'); 

// Write a review
router.post('/reviews', writeReview);

// View all reviews
router.get('/viewReviews', viewReviews);

module.exports = router;