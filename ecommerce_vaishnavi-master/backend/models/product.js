const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    sku :{
        type:Number,
        required:true,
    },
    image: {
        type: [String],
    },
    originalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    discountedPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    color: {
        type: [String],
        required: true,
    },
    sizes: {
        type: [String], // Array of predefined string values
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], // Valid sizes
        required: true,
    },
    rating:{
        type:Number,
    },
    description : {
        type:String,
    },
    category : {
        type:[String],
    },
    tags:{
        type:[String]
    },
    option1 : {
        type : String,
        enum :['Men','Women','Imported','Customize'],
    },
    option2: {
        type : String,
        enum : ['Tshirt','Shirt','Hoodies']
    },
    reviews :  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ]
}, {
    timestamps: true, 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;