const Product = require("../models/product"); // Import the Product schema
const AllProducts = require("../models/allProducts"); // Import the AllProducts schema

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      sku,
      image,
      originalPrice,
      discountedPrice,
      color,
      sizes,
      rating,
      description,
      category,
      tags,
      option1,
      option2,
    } = req.body;

    // Create a new product
    const newProduct = new Product({
      productName,
      sku,
      image,
      originalPrice,
      discountedPrice,
      color,
      sizes,
      rating,
      description,
      category,
      tags,
      option1,
      option2,
    });

    // Save the product in the database
    const savedProduct = await newProduct.save();

    // Find the existing AllProducts document or create a new one if it doesn't exist
    let allProducts = await AllProducts.findOne();
    if (!allProducts) {
      allProducts = new AllProducts({
        mens: {
          tshirts: [],
          shirts: [],
          sweatshirts: [],
        },
        womens: {
          tshirts: [],
          shirts: [],
          sweatshirts: [],
        },
        imported: {
          tshirts: [],
          shirts: [],
          sweatshirts: [],
        },
        customDesign: {
          tshirts: [],
          shirts: [],
          sweatshirts: [],
        },
      });
    }

    // Determine which field to update in AllProducts
    let fieldToUpdate;

    switch (option1) {
      case "Men":
        fieldToUpdate = allProducts.mens;
        break;
      case "Women":
        fieldToUpdate = allProducts.womens;
        break;
      case "Imported":
        fieldToUpdate = allProducts.imported;
        break;
      case "Customize":
        fieldToUpdate = allProducts.customDesign;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid value for option1.",
        });
    }

    // Map option2 to the corresponding category
    switch (option2) {
      case "Tshirt":
        fieldToUpdate.tshirts.push(savedProduct._id);
        break;
      case "Shirt":
        fieldToUpdate.shirts.push(savedProduct._id);
        break;
      case "Hoodies":
        fieldToUpdate.sweatshirts.push(savedProduct._id);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid value for option2.",
        });
    }

    // Save the updated AllProducts document
    await allProducts.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully.",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the product.",
      error: error.message,
    });
  }
};

module.exports = { addProduct };
