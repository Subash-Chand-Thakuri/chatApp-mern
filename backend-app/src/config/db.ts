import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import colors from 'colors';

 export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined");
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB!");
    } catch (error: any) {
        console.error(colors.red.bold.underline("Error while connecting to database:"), error.message);
    }
};

 