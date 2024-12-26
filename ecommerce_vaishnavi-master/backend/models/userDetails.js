const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ordersPlaced: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    cartData: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
            },
        },
    ],
}, {
    timestamps: true,
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;