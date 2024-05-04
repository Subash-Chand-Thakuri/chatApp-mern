import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
// import chats from './data/chat.js';
import { connectDB } from './config/db.js';
import colors, { bgYellow, yellow } from "colors";
import userRoutes from "./routes/userRoutes.js"
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import  chatRoutes from "./routes/chatRoutes.js"
import  messageRoutes from "./routes/messageRoutes.js"

const port = process.env.PORT || 3000;

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("API is running successfully!")
})



app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

app.use(notFound);
app.use(errorHandler);





app.listen(port, ()=>{
    console.log(colors.cyan(' Server running on localhost: ') + colors.yellow(`${port}`).bold )
})