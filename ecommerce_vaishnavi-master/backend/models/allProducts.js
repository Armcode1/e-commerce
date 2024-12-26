const mongoose = require("mongoose");

const allProductsSchema = new mongoose.Schema({
  mens: {
    tshirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    shirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    sweatshirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  womens: {
    tshirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    shirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    sweatshirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  imported: {
    tshirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    shirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    sweatshirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  customDesign: {
    tshirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    shirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    sweatshirts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
});

module.exports = mongoose.model("AllProducts", allProductsSchema);