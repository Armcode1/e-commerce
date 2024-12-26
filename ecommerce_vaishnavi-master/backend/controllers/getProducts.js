const AllProducts = require('../models/allProducts');
const Product = require('../models/product');

const getCategoryProducts = async (req, res) => {
  try {
 
    const { category, subcategory } = req.body;

    if (!category || !subcategory) {
      return res.status(400).json({
        success: false,
        message: "Category and subcategory are required.",
      });
    }

    const allProducts = await AllProducts.findOne().populate(
      `${category}.${subcategory}`
    );

    if (!allProducts || !allProducts[category]) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    const products = allProducts[category][subcategory];

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in the specified subcategory.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Products in ${subcategory} under ${category}`,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching category products:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products.",
      error: error.message,
    });
  }
};

module.exports = { getCategoryProducts };