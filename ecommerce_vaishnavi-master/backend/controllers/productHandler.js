const AllProducts = require("../models/allProducts");

const searchProducts = async (req, res) => {
  const { searchWord } = req.params;

  try {
    const allProducts = await AllProducts.findOne().populate({
      path: "mens.tshirts mens.shirts mens.sweatshirts womens.tshirts womens.shirts womens.sweatshirts imported.tshirts imported.shirts imported.sweatshirts customDesign.tshirts customDesign.shirts customDesign.sweatshirts",
    });

    if (!allProducts) {
      return res.status(404).json({
        success: false,
        message: "AllProducts document not found.",
      });
    }

    const products = [
      ...allProducts.mens.tshirts,
      ...allProducts.mens.shirts,
      ...allProducts.mens.sweatshirts,
      ...allProducts.womens.tshirts,
      ...allProducts.womens.shirts,
      ...allProducts.womens.sweatshirts,
      ...allProducts.imported.tshirts,
      ...allProducts.imported.shirts,
      ...allProducts.imported.sweatshirts,
      ...allProducts.customDesign.tshirts,
      ...allProducts.customDesign.shirts,
      ...allProducts.customDesign.sweatshirts,
    ];

    // console.log(products);

    const searchResults = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchWord.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchWord.toLowerCase()))
    );

    if (searchResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found matching the search criteria.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products found matching the search criteria.",
      products: searchResults,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching for products.",
      error: error.message,
    });
  }
};

module.exports = { searchProducts };