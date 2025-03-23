import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId );

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        console.log("Updated Cart Data:", cartData); // 🛑 Debugging Step

        userData.cartData = cartData;
        userData.markModified("cartData");
        await userData.save();

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log("Error in addToCart:", error);
        res.json({ success: false, message: "Error" });
    }
};
 
// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[req.body.itemId]) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] <= 0) {
                delete cartData[req.body.itemId];
            }
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error", error: error.message });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error", error: error.message });
    }
};

export { addToCart, removeFromCart, getCart };
