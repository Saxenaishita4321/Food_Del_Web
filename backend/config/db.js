// import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://Ishita_Tomato0987:@Tomato#4321@cluster0.dlzzd.mongodb.net/FOOD_dev').then(()=>console.log("DB Connected"));
// }

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env file

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        await mongoose.connect(mongoURI); // ✅ No need for deprecated options

        console.log("✅ Database Connected Successfully!");
    } catch (error) {
        console.error("❌ DB Connection Failed:", error.message);
        process.exit(1);
    }
};
