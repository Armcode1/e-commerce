const UserDetails = require("../models/userDetails");
const Product = require("../models/product");

const addToCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const user = await UserDetails.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        const existingCartItem = user.cartData.find(
            (item) => item.product.toString() === productId
        );

        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            user.cartData.push({ product: productId, quantity: 1 });
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart successfully.",
            cartData: user.cartData,
        });

    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding product to cart.",
            error: error.message,
        });
    }
};

const increaseCartQuantity = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const user = await UserDetails.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const cartItem = user.cartData.find(
            (item) => item.product.toString() === productId
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart.",
            });
        }

        cartItem.quantity += 1;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product quantity increased successfully.",
            cartData: user.cartData,
        });
    } catch (error) {
        console.error("Error increasing product quantity:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while increasing product quantity.",
            error: error.message,
        });
    }
};

const decreaseCartQuantity = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const user = await UserDetails.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const cartItemIndex = user.cartData.findIndex(
            (item) => item.product.toString() === productId
        );

        if (cartItemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart.",
            });
        }

        const cartItem = user.cartData[cartItemIndex];
        cartItem.quantity -= 1;

        if (cartItem.quantity === 0) {
            user.cartData.splice(cartItemIndex, 1);
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product quantity updated successfully.",
            cartData: user.cartData,
        });
    } catch (error) {
        console.error("Error updating product quantity:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating product quantity.",
            error: error.message,
        });
    }
};

const deleteProductFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const user = await UserDetails.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const cartItemIndex = user.cartData.findIndex(
            (item) => item.product.toString() === productId
        );

        if (cartItemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart.",
            });
        }

        user.cartData.splice(cartItemIndex, 1);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully.",
            cartData: user.cartData,
        });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while removing product from cart.",
            error: error.message,
        });
    }
};


module.exports = { addToCart, increaseCartQuantity, decreaseCartQuantity, deleteProductFromCart };