import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order (COD)
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;

        // 1. Validate user
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // 2. Validate payment method (Only COD allowed for now)
        if (paymentMethod !== "COD") {
            return res.status(400).json({ message: "Only Cash on Delivery (COD) is available" });
        }

        // 3. Create order in database
        const order = new orderModel({
            userId,
            items,
            amount,
            address,
            status: "Food Processing", // Default status
            payment: false,  // Since it's COD, payment remains false
        });

        await order.save();

        // 4. Return success response
        res.status(201).json({ message: "COD Order placed successfully!", order });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export { placeOrder };
