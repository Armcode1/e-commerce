const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
}, {
    timestamps: true,  
});

module.exports = mongoose.model('Review', reviewSchema);
